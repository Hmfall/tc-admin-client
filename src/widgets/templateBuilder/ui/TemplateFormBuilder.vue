<template>
  <div class="d-flex flex-column ga-8">
    <div
      v-if="!hideActions"
      class="d-flex justify-end ga-4"
    >
      <slot
        v-if="$slots.actions"
        name="actions"
        v-bind="{
          deleteAll: onDeleteAll,
          openDialog: localDialog.open,
        }"
      />

      <template v-else>
        <v-btn @click="onDeleteAll">Удалить все</v-btn>

        <v-btn
          variant="flat"
          color="primary"
          @click="localDialog.open"
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
          :item="item"
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
      :item="updatingItem"
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
import { useFetch } from '@/shared/lib/useFetch/useFetch';
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
    hideActions?: boolean;
    dialogWidth?: string | number;
    class?: string;
  }>(),
  {
    dialog: false,
    refetchStore: true,
  },
);

const emit = defineEmits<{
  (e: 'update:dialog', value: boolean): void;
}>();

const mode = ref<FormEditMode>();

const isLocalDialog = ref(props.dialog);

const isLoadingDraft = ref(false);

const isLoadingImmediateSubmit = ref(false);

const updatingItem = ref(null) as Ref<T | null>;

const draft = ref(new Map()) as Ref<Map<T, UpdateFormFieldPromise<T>[]>>;

/* TODO: Обработка promises для immediateSubmit */
const useImmediateSubmit = async (
  operation: SubmitOperation,
  item: T,
  promises?: UpdateFormFieldPromise<T>[],
) => {
  const execute: Record<SubmitOperation, () => Promise<T> | Promise<void>> = {
    create: () => item.create(),
    update: () => item.update(),
    delete: () => item.delete(),
  };

  await useFetch<T | void>(() => execute[operation](), {
    isLoading: isLoadingImmediateSubmit,
  });

  localDialog.close();
  emit('update:dialog', false);

  if (props.refetchStore) {
    props.store.fetch();
  }
};

const onCreateItem = async (item: T) => {
  if (props.immediateSubmit) {
    useImmediateSubmit('create', item);
    return;
  }

  localDialog.close();
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

  localDialog.close();
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
  localDialog.open();
};

const onSaveButton = () => {
  useFetch(
    () =>
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
    { isLoading: isLoadingImmediateSubmit },
  );
};

const onClose = () => {
  updatingItem.value = null;
};

const localDialog = {
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
