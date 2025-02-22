<template>
  <ModuleLayout>
    <template #header>Редактирование раздела "{{ moduleConfig.name }}"</template>

    <BaseModule
      class="d-flex flex-column ga-10"
      :model="cfg.model"
      :store="cfg.store"
      :template-slots="cfg.templateSlots"
      :form-fields="cfg.formFields"
    />
  </ModuleLayout>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import ModuleLayout from '@/app/layouts/ModuleLayout.vue';
import type { BaseModuleConfig } from '@/modules/baseModule/model/types';
import BaseModule from '@/modules/baseModule/ui/BaseModule.vue';
import { abortController } from '@/shared/lib/abortController/abortController';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import { isPiniaStore } from '@/shared/utils';

const props = defineProps<{
  moduleConfig: BaseModuleConfig<T, A>;
}>();

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
    value.store.fetch({ signal: getControllerSignal() });
  },
  {
    immediate: true,
  },
);
</script>
