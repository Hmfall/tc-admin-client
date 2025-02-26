<template>
  <ModuleLayout>
    <template #header>Редактирование раздела "{{ moduleConfig.name }}"</template>

    <BaseModule
      class="d-flex flex-column ga-10"
      editor
      :model="cfg.model"
      :store="cfg.store"
      :template-slots="cfg.templateSlots"
      :form-fields="cfg.formFields"
      :delete-all-confirm="() => confirm('Удалить все карточки?', 'Удалить')"
    />
  </ModuleLayout>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import ModuleLayout from '@/app/layouts/moduleLayout/ui/ModuleLayout.vue';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import BaseModule from '@/features/baseModule/ui/BaseModule.vue';
import { useConfirmDialog } from '@/shared/components/confirmDialog/model/useConfirmDialog';
import { abortController } from '@/shared/lib/abortController/abortController';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import { isPiniaStore } from '@/shared/utils';

const props = defineProps<{
  moduleConfig: BaseModuleConfig<T, A>;
}>();

const confirm = useConfirmDialog();

const { getControllerSignal, setupController } = abortController();

const cfg = computed(() => ({
  ...props.moduleConfig,
  store: isPiniaStore(props.moduleConfig.store)
    ? props.moduleConfig.store
    : props.moduleConfig.store(),
}));

watch(
  cfg,
  (value) => {
    setupController();
    value.store.load({ signal: getControllerSignal() });
  },
  {
    immediate: true,
  },
);
</script>
