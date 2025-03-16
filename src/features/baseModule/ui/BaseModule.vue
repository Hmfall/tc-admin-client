<template>
  <div class="d-flex flex-column flex-1-1-100 ga-8">
    <div
      v-if="!hideActions && !store.config.singleton"
      class="d-flex justify-end ga-4"
    >
      <ActionButtons
        secondary-button="Удалить все"
        primary-button="Добавить"
        reversed
        :loading-secondary-button="isLoadingDeleteAll"
        @on-primary-click="thisDialog.open"
        @on-secondary-click="onDeleteAllBtn"
      />
    </div>

    <div :class="props.class">
      <SkeletonLoader
        :length="store.config?.singleton ? 1 : 3"
        :loading="store.isLoading"
        :render="templateSlots.skeletonRender"
      >
        <template v-if="items.length">
          <AutoTemplate
            v-for="item in items"
            :key="item.UUID"
            :value="item"
            :slots="templateSlots"
            @reset="onResetBtn(item)"
            @update="onUpdateBtn(item)"
            @delete="onDeleteItem(item)"
          />
        </template>

        <template v-else>
          <v-empty-state>
            <template #text>
              <div class="text-medium-emphasis">Нет данных.</div>
            </template>
          </v-empty-state>
        </template>
      </SkeletonLoader>
    </div>
    {{ snapshotItemsLength }}
    {{ hasDiff }}
    {{ hasSnapshotDiff }}
    <div
      v-if="!immediateSubmit && !hasSnapshotDiff"
      class="d-flex justify-end"
    >
      <slot
        v-if="$slots.submit"
        name="submit"
        v-bind="{
          save: onSaveBtn,
          isLoading,
        }"
      />

      <ActionButtons
        v-else
        primary
        primary-button="Сохранить"
        :locked-primary-button="!hasDiff"
        :loading-primary-button="isLoading"
        @on-primary-click="onSaveBtn"
      />
    </div>

    <AutoFormDialog
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

              <template v-else>
                <span v-html="updatingItemName" />
              </template>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </template>
    </AutoFormDialog>
  </div>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import type { ClassConstructor } from 'class-transformer';
import type {
  AutoFormFields,
  AutoFormItemsMap,
  AutoFormSubmitOperation,
  FormEditMode,
  UpdateAutoFormFieldPromise,
} from '@/features/autoForm/model/types';
import AutoFormDialog from '@/features/autoForm/ui/AutoFormDialog.vue';
import type { AutoTemplateSlots } from '@/features/autoTemplate/model/types';
import AutoTemplate from '@/features/autoTemplate/ui/AutoTemplate.vue';
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
    templateSlots: AutoTemplateSlots<T>;
    formFields?: AutoFormFields<T>;
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const message = useMessage();
const confirm = useConfirmDialog();

const { isLoading: isLoadingImmediateSubmit, withLoading: withLoadingImmediateSubmit } =
  useLoading();
const { isLoading, withLoadingFn } = useLoading();
const { isLoading: isLoadingDeleteAll, withLoadingFn: withLoadingDeleteAllFn } = useLoading();

const mode = ref<FormEditMode>();
const isLocalDialog = ref(props.dialog);

const updatingItem = ref(null) as Ref<T | null>;
const updatingItemName = ref(null) as Ref<string | null>;

const items = ref([]) as Ref<T[]>;
const snapshotItemsLength = ref(null) as Ref<number | null>;

const toCreateItems = ref(new Map()) as Ref<AutoFormItemsMap<T>>;
const toUpdateItems = ref(new Map()) as Ref<AutoFormItemsMap<T>>;
const toDeleteItems = ref([]) as Ref<T[]>;

const store = computed(() => props.store());

const hasDiff = computed(() =>
  [toCreateItems.value.size, toUpdateItems.value.size, toDeleteItems.value.length].some(Boolean),
);

const hasSnapshotDiff = computed(() => !hasDiff.value && !snapshotItemsLength.value);

const useImmediateSubmit = async (
  operation: AutoFormSubmitOperation,
  value: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  promises?: UpdateAutoFormFieldPromise<T>[],
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

const onCreateItem = async (item: T, promises: UpdateAutoFormFieldPromise<T>[]) => {
  if (props.immediateSubmit) {
    await useImmediateSubmit('create', item);
    return;
  }

  items.value.push(item);
  toCreateItems.value.set(item.UUID, {
    item,
    promises,
  });

  thisDialog.close();
};

const onUpdateItem = async (item: T, promises: UpdateAutoFormFieldPromise<T>[]) => {
  if (props.immediateSubmit) {
    await useImmediateSubmit('update', item);
    return;
  }

  if (updatingItem.value && item.hasDiff) {
    updatingItem.value.merge(item);

    if (item.ID) {
      toUpdateItems.value.set(updatingItem.value.UUID, {
        item: updatingItem.value,
        promises,
      });
    }
  }

  thisDialog.close();
};

const onDeleteItem = async (item: T) => {
  if (props.immediateSubmit) {
    if (props.deleteItemConfirm) {
      await confirm(...props.deleteItemConfirm);
    }

    await useImmediateSubmit('delete', item);

    return;
  }

  items.value = items.value.filter((value) => !value.isSame(item));
  toCreateItems.value.delete(item.UUID);
  toUpdateItems.value.delete(item.UUID);

  if (item.ID) {
    toDeleteItems.value.push(item);
  }
};

const onResetBtn = async (item: T) => {
  await confirm('Сбросить изменения?', 'Сбросить');
  toUpdateItems.value.delete(item.UUID);
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

const onDeleteAllBtn = async () => {
  if (props.deleteAllConfirm) {
    await confirm(...props.deleteAllConfirm);
  }

  store.value.setIsLoading(true);

  await withLoadingDeleteAllFn(async () => {
    await Promise.all(items.value.map((item) => item.delete()));
    await store.value.load();
  });
};

const onSaveBtn = async () => {
  const prepare = () => {
    const processItems = (itemsMap: AutoFormItemsMap<T>) =>
      [...itemsMap.values()].flatMap(({ item, promises }) =>
        promises.map(async (promise) => {
          const response = await promise();
          item[response.key] = response.value;
        }),
      );

    return [...processItems(toCreateItems.value), ...processItems(toUpdateItems.value)];
  };

  const toCreate = [...toCreateItems.value.values()].map(({ item }) => item);
  const toUpdate = [...toUpdateItems.value.values()].map(({ item }) => item);
  const toDelete = [...toDeleteItems.value];

  store.value.setIsLoading(true);

  await withLoadingFn(async () => {
    await Promise.all(prepare());
    await Promise.all([
      ...toCreate.map((item) => item.create()),
      ...toUpdate.map((item) => item.update()),
      ...toDelete.map((item) => item.delete()),
    ]);
    await store.value.load();
  });

  toCreateItems.value.clear();
  toUpdateItems.value.clear();
  toDeleteItems.value = [];
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
  () => store.value.items,
  (value) => {
    items.value = [...value];
    snapshotItemsLength.value = value.length;
  },
);

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
