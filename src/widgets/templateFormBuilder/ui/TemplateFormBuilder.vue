<template>
  <div class="d-flex-column ga-8">
    <div
      v-if="!hideActions"
      class="d-flex justify-end ga-4"
    >
      <slot
        v-if="$slots.actions"
        name="actions"
        v-bind="{
          deleteAll: onDeleteAll,
          openDialog: thisDialog.open,
        }"
      />

      <template v-else>
        <v-btn @click="onDeleteAll">Удалить все</v-btn>

        <v-btn
          variant="flat"
          color="primary"
          @click="thisDialog.open"
        >
          Добавить
        </v-btn>
      </template>
    </div>

    <div :class="props.class">
      <SkeletonLoader
        :length="store.config?.singleton ? 1 : 3"
        :loading="store.isLoading"
        :render="templateSlots.skeletonRender"
      >
        <TemplateBuilder
          v-for="(item, i) in store.items"
          :key="item.ID ?? i"
          :value="item"
          :slots="templateSlots"
          @update="onUpdateButton(item)"
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
          save: onSaveButton,
          isLoading: isLoadingDraft,
        }"
      />

      <v-btn
        v-else
        variant="flat"
        color="primary"
        :loading="isLoadingDraft"
        @click="onSaveButton"
      >
        Сохранить
      </v-btn>
    </div>

    <FormBuilderDialog
      v-model="isLocalDialog"
      :value="updatingItem"
      :model="model"
      :form-fields="formFields"
      :mode="mode"
      :loading="isLoadingImmediateSubmit"
      :dialog-width="dialogWidth"
      @create="onCreateItem"
      @update="onUpdateItem"
      @close="onClose"
      @update:model-value="$emit('update:dialog', $event)"
    />
  </div>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import type { Ref } from 'vue';
import type { ClassConstructor } from 'class-transformer';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import type { ModelStore } from '@/shared/lib/storeFactory/types';
import { useLoading } from '@/shared/lib/useLoading/useLoading';
import SkeletonLoader from '@/shared/ui/skeletonLoader/SkeletonLoader.vue';
import type {
  FormBuilderFields,
  FormEditMode,
  SubmitOperation,
  UpdateFormFieldPromise,
} from '@/widgets/formBuilder/types';
import FormBuilderDialog from '@/widgets/formBuilder/ui/FormBuilderDialog.vue';
import type { TemplateBuilderSlots } from '@/widgets/templateBuilder/types';
import TemplateBuilder from '@/widgets/templateBuilder/ui/TemplateBuilder.vue';

const props = withDefaults(
  defineProps<{
    dialog?: boolean;
    model: ClassConstructor<T>;
    store: ModelStore<T, A>;
    templateSlots: TemplateBuilderSlots<T>;
    formFields?: FormBuilderFields<T>;
    immediateSubmit?: boolean;
    refetchStore?: boolean;
    isLoadingOnCreate?: boolean;
    isLoadingOnUpdate?: boolean;
    isLoadingOnDelete?: boolean;
    hideActions?: boolean;
    dialogWidth?: string | number;
    class?: string;
  }>(),
  {
    refetchStore: true,
  },
);

const emit = defineEmits<{
  (e: 'update:dialog', value: boolean): void;
}>();

const mode = ref<FormEditMode>();

const isLocalDialog = ref(props.dialog);

const updatingItem = ref(null) as Ref<T | null>;

const draft = ref(new Map()) as Ref<Map<T, UpdateFormFieldPromise<T>[]>>;

const { isLoading: isLoadingImmediateSubmit, withLoading: withLoadingImmediateSubmit } =
  useLoading();

const { isLoading: isLoadingDraft, withLoading: withLoadingDraft } = useLoading();

/* TODO: Обработка promises для immediateSubmit */
const useImmediateSubmit = async (
  operation: SubmitOperation,
  value: T,
  promises?: UpdateFormFieldPromise<T>[],
) => {
  if (value.hasDiff) {
    if (
      {
        create: props.isLoadingOnCreate,
        update: props.isLoadingOnUpdate,
        delete: props.isLoadingOnDelete,
      }[operation]
    ) {
      props.store.setIsLoading(true);
    }

    await withLoadingImmediateSubmit<T | void>(
      {
        create: () => value.create(),
        update: () => value.update(),
        delete: () => value.delete(),
      }[operation](),
    );

    props.store.fetch();
  }

  thisDialog.close();
  emit('update:dialog', false);
};

const onCreateItem = async (item: T) => {
  if (props.immediateSubmit) {
    useImmediateSubmit('create', item);
    return;
  }

  thisDialog.close();
};

const onUpdateItem = async (item: T, promises: UpdateFormFieldPromise<T>[]) => {
  if (props.immediateSubmit) {
    useImmediateSubmit('update', item);
    return;
  }

  if (updatingItem.value) {
    updatingItem.value.merge(item);
    draft.value.set(updatingItem.value, promises);
  }

  thisDialog.close();
};

/* TODO: Обработка delete операции draft-варианта формы */
const onDeleteItem = (item: T) => {
  if (props.immediateSubmit) {
    useImmediateSubmit('delete', item);
  }
};

const onDeleteAll = () => {};

const onUpdateButton = (item: T) => {
  updatingItem.value = item;
  mode.value = 'update';
  thisDialog.open();
};

const onSaveButton = () => {
  withLoadingDraft(
    Promise.all(
      Array.from(draft.value.entries()).flatMap(([item, promises]) =>
        promises.map((promise) =>
          promise().then((response) => {
            item[response.key] = response.value;
          }),
        ),
      ),
    ).then(() => {
      Array.from(draft.value.keys()).forEach(() => {});
    }),
  );
};

const onClose = () => {
  updatingItem.value = null;
};

const thisDialog = {
  open: () => (isLocalDialog.value = true),
  close: () => (isLocalDialog.value = false),
};

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
