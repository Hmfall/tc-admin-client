<template>
  <ModuleLayout>
    <template #header>Редактирование раздела "{{ moduleConfig.name }}"</template>

    <BaseModule
      class="d-flex flex-column ga-10"
      :model="moduleConfig.model"
      :store="moduleConfig.store()"
      :template-slots="moduleConfig.templateSlots"
      :form-fields="moduleConfig.formFields"
    />
  </ModuleLayout>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import type { BaseModuleConfig } from '@/widgets/baseModule/model/types';
import BaseModule from '@/widgets/baseModule/ui/BaseModule.vue';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import ModuleLayout from '@/shared/ui/layouts/ModuleLayout.vue';

const props = defineProps<{
  moduleConfig: BaseModuleConfig<T, A>;
}>();

watch(
  () => props.moduleConfig,
  (value) => value.store().fetch(),
  {
    immediate: true,
  },
);
</script>
