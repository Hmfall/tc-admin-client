<template>
  <ModuleLayout>
    <template #header>
      {{ moduleConfig.rawName ? moduleConfig.name : `Редактирование раздела "${moduleConfig.name}"` }}
    </template>

    <BaseModule
      class="d-flex flex-column ga-10"
      editor
      :module-name="moduleConfig.name"
      :model="moduleConfig.model"
      :store="moduleConfig.store"
      :template-slots="moduleConfig.templateSlots"
      :form-fields="moduleConfig.formFields"
      :immediate-submit="moduleConfig.immediateSubmit"
    />
  </ModuleLayout>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import { isAxiosError } from 'axios';
import ModuleLayout from '@/app/layouts/moduleLayout/ui/ModuleLayout.vue';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import BaseModule from '@/features/baseModule/ui/BaseModule.vue';
import { useMessage } from '@/shared/components/messageAlert/model/useMessage';
import { abortController } from '@/shared/lib/abortController/abortController';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';

const props = defineProps<{
  moduleConfig: BaseModuleConfig<T, A>;
}>();

const { getControllerSignal, setupController, isCancelError } = abortController();

const message = useMessage();

watch(
  () => props.moduleConfig,
  (moduleConfig) => {
    setupController();
    moduleConfig
      .store()
      .load({ signal: getControllerSignal() })
      .catch((e) => {
        if (isAxiosError(e) && !isCancelError(e)) {
          message.error();
        }
      });
  },
  {
    immediate: true,
  },
);
</script>
