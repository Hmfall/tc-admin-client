<template>
  <div class="d-flex flex-column ga-8">
    <div
      v-if="!hideActions && !store.config.singleton"
      class="d-flex justify-end ga-4"
    >
      <v-btn @click="onDeleteAllBtn">Удалить все</v-btn>

      <v-btn
        variant="flat"
        color="primary"
        @click="thisDialog.open"
      >
        Добавить
      </v-btn>
    </div>

    <div :class="props.class">
      <SkeletonLoader
        :length="store.config?.singleton ? 1 : 3"
        :loading="store.isLoading"
        :render="templateSlots.skeletonRender"
      >
        <TemplateBuilder
          v-for="item in store.items"
          :key="item.UUID"
          :value="item"
          :slots="templateSlots"
          @reset="onResetBtn(item)"
          @update="onUpdateBtn(item)"
          @delete="onDeleteItem(item)"
        />
      </SkeletonLoader>
    </div>

    <div
      v-if="!immediateSubmit"
      class="d-flex justify-end"
    >
      <slot
        v-if="$slots.submit"
        name="submit"
        v-bind="{
          save: onSaveBtn,
          isLoading: isLoadingDraft,
        }"
      />

      <!-- TODO: locked-confirm-button="!props.store.isDraftEmpty" -->
      <ActionButtons
        confirm
        confirm-button="Сохранить"
        locked-confirm-button
        :loading="isLoadingDraft"
        @confirm="onSaveBtn"
      >
        <template #confirmButtonTooltip>
          <v-tooltip
            activator="parent"
            location="bottom"
            text="В разработке!"
          />
        </template>
      </ActionButtons>
    </div>

    <FormBuilderDialog
      v-model="isLocalDialog"
      :value="updatingItem"
      :model="model"
      :form-fields="formFields"
      :mode="mode"
      :loading="isLoadingImmediateSubmit"
      :dialog-width="dialogWidth"
      :editor="editor"
      @create="onCreateItem"
      @update="onUpdateItem"
      @close="onClose"
      @update:model-value="$emit('update:dialog', $event)"
    >
      <template #header>
        <v-breadcrumbs>
          <v-breadcrumbs-item>
            {{ props.moduleName }}
          </v-breadcrumbs-item>

          <template v-if="!store.config.singleton">
            <v-breadcrumbs-divider />

            <v-breadcrumbs-item>
              <template v-if="mode === 'create'">
                <span class="text-decoration-underline font-italic">Добавить</span>
              </template>

              <template v-else>{{ updatingItemName }}</template>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </template>
    </FormBuilderDialog>
  </div>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import type { ClassConstructor } from 'class-transformer';
import type {
  FormBuilderFields,
  FormEditMode,
  SubmitOperation,
  UpdateFormFieldPromise,
} from '@/features/formBuilder/model/types';
import FormBuilderDialog from '@/features/formBuilder/ui/FormBuilderDialog.vue';
import type { TemplateBuilderSlots } from '@/features/templateBuilder/model/types';
import TemplateBuilder from '@/features/templateBuilder/ui/TemplateBuilder.vue';
import type { ConfirmOptions } from '@/shared/components/confirmDialog/model/types';
import { useConfirmDialog } from '@/shared/components/confirmDialog/model/useConfirmDialog';
import { useMessage } from '@/shared/components/messageAlert/model/useMessage';
import { useLoading } from '@/shared/composables/useLoading/useLoading';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import type { StoreFactoryDefinition } from '@/shared/lib/storeFactory/model/types';
import ActionButtons from '@/shared/ui/actionButtons/ActionButtons.vue';
import SkeletonLoader from '@/shared/ui/skeletonLoader/SkeletonLoader.vue';

const props = withDefaults(
  defineProps<{
    dialog?: boolean;
    moduleName: string;
    model: ClassConstructor<T>;
    store: StoreFactoryDefinition<T, A>;
    templateSlots: TemplateBuilderSlots<T>;
    formFields?: FormBuilderFields<T>;
    immediateSubmit?: boolean;
    refetchStore?: boolean;
    loadingOnCreate?: boolean;
    loadingOnUpdate?: boolean;
    loadingOnDelete?: boolean;
    hideActions?: boolean;
    dialogWidth?: string | number;
    class?: string;
    editor?: boolean;
    deleteItemConfirm?: ConfirmOptions;
    deleteAllConfirm?: ConfirmOptions;
  }>(),
  {
    refetchStore: true,
  },
);

const emit = defineEmits<{
  (e: 'update:dialog', value: boolean): void;
}>();

const message = useMessage();
const confirm = useConfirmDialog();

const { isLoading: isLoadingImmediateSubmit, withLoading: withLoadingImmediateSubmit } =
  useLoading();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { isLoading: isLoadingDraft, withLoading: withLoadingDraft } = useLoading();

const mode = ref<FormEditMode>();
const isLocalDialog = ref(props.dialog);

const updatingItem = ref(null) as Ref<T | null>;
const updatingItemName = ref(null) as Ref<string | null>;
const draft = ref(new Map()) as Ref<Map<T, UpdateFormFieldPromise<T>[]>>;

const store = computed(() => props.store());

store.value.initDraftWatch();

// TODO: Обработка promises для immediateSubmit
const useImmediateSubmit = async (
  operation: SubmitOperation,
  value: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  promises?: UpdateFormFieldPromise<T>[],
) => {
  if (value.hasDiff || operation === 'delete') {
    if (
      {
        create: props.loadingOnCreate,
        update: props.loadingOnUpdate,
        delete: props.loadingOnDelete,
      }[operation]
    ) {
      store.value.setIsLoading(true);
    }

    await withLoadingImmediateSubmit<T | void>(
      {
        create: () => value.create(),
        update: () => value.update(),
        delete: () => value.delete(),
      }[operation](),
    );

    store.value.load();
  }

  thisDialog.close();
  emit('update:dialog', false);
};

const onCreateItem = async (item: T) => {
  if (props.immediateSubmit) {
    await useImmediateSubmit('create', item);
    return;
  }

  store.value.toDraft(item);

  thisDialog.close();
};

// TODO: toDraft
const onUpdateItem = async (item: T, promises: UpdateFormFieldPromise<T>[]) => {
  if (props.immediateSubmit) {
    await useImmediateSubmit('update', item);
    return;
  }

  if (updatingItem.value) {
    updatingItem.value.merge(item);
    draft.value.set(updatingItem.value, promises);
  }

  thisDialog.close();
};

// TODO: Обработка delete операции draft-варианта формы
const onDeleteItem = async (item: T) => {
  if (props.immediateSubmit) {
    if (props.deleteItemConfirm) {
      await confirm(...props.deleteItemConfirm);
    }

    await useImmediateSubmit('delete', item);

    return;
  }

  // TODO: Локальное удаление сущности
  message.warning('В разработке!');
};

const onDeleteAllBtn = async () => {
  if (props.deleteAllConfirm) {
    await confirm(...props.deleteAllConfirm);
  }
  // TODO: Запрос на удаление всех сущностей
  message.warning('В разработке!');
};

const onResetBtn = async (item: T) => {
  await confirm('Сбросить изменения?', 'Сбросить');
  item.resetToSnapshot();
};

const onUpdateBtn = (item: T) => {
  const primaryField = item.getPrimaryFieldValue();

  if (typeof primaryField === 'string') {
    updatingItemName.value = primaryField;
  }

  updatingItem.value = item;
  mode.value = 'update';
  thisDialog.open();
};

const onSaveBtn = () => {
  console.log(store.value.draft);
  // TODO: Обработка промисов формы, отправка черновика
  // withLoadingDraft(
  //   Promise.all(
  //     Array.from(draft.value.entries()).flatMap(([item, promises]) =>
  //       promises.map((promise) =>
  //         promise().then((response) => {
  //           item[response.key] = response.value;
  //           props.store.toDraft(item);
  //         }),
  //       ),
  //     ),
  //   ).then(() => {
  //     console.log(props.store.draft);
  //     // Array.from(draft.value.keys()).forEach(() => {});
  //   }),
  // );
};

const onClose = () => {
  mode.value = 'create';
  updatingItem.value = null;
  updatingItemName.value = null;
};

const thisDialog = {
  open: () => (isLocalDialog.value = true),
  close: () => (isLocalDialog.value = false),
};

defineExpose({
  deleteAll: onDeleteAllBtn,
});

watch(
  () => props.dialog,
  (value) => {
    isLocalDialog.value = value;
    mode.value = updatingItem.value ? 'update' : 'create';
  },
  {
    immediate: true,
  },
);
</script>
