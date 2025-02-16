<template>
  <slot />

  <BaseDialog
    :key="confirm.id"
    v-model="confirm.modelValue"
    :dialog-width="640"
    :close-icon="false"
    :persistent="false"
    :text="confirm.content"
    :confirm-button="confirm.confirmText"
    :cancel-button="confirm.cancelText"
    @on-confirm="confirm.resolve"
    @on-cancel="confirm.reject"
  />
</template>

<script setup lang="ts">
import BaseDialog from '@/shared/ui/baseDialog/BaseDialog.vue';
import type { ConfirmInstance, ConfirmOptions } from '@/widgets/confirmDialog/types';

const confirm = ref<ConfirmInstance>({ modelValue: false });

const pushConfirm = (options: ConfirmOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    confirm.value = {
      id: Symbol(),
      modelValue: true,
      resolve,
      reject,
      ...options,
    };
  });
};

provide('confirm', pushConfirm);
</script>
