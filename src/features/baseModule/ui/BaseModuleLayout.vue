<template>
  <ModuleLayout>
    <template #header>Редактирование раздела "{{ moduleConfig.name }}"</template>

    <BaseModule
      class="d-flex flex-column ga-10"
      editor
      :module-name="moduleConfig.name"
      :model="moduleConfig.model"
      :store="moduleConfig.store"
      :template-slots="moduleConfig.templateSlots"
      :form-fields="moduleConfig.formFields"
      :delete-all-confirm="['Удалить все?', 'Удалить']"
    />
  </ModuleLayout>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import ModuleLayout from '@/app/layouts/moduleLayout/ui/ModuleLayout.vue';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import BaseModule from '@/features/baseModule/ui/BaseModule.vue';
import { abortController } from '@/shared/lib/abortController/abortController';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';

const props = defineProps<{
  moduleConfig: BaseModuleConfig<T, A>;
}>();

const { getControllerSignal, setupController } = abortController();

watch(
  () => props.moduleConfig,
  (value) => {
    setupController();
    value.store().load({ signal: getControllerSignal() });
  },
  {
    immediate: true,
  },
);
</script>
