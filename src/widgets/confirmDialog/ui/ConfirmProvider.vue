<template>
  <slot />

  <BaseDialog
    :key="confirm.id"
    v-model="confirm.modelValue"
    :dialog-width="640"
    :close-icon="false"
    :persistent="false"
    :confirm-button="confirm.confirmText"
    :cancel-button="confirm.cancelText"
    @on-confirm="confirm.resolve"
    @on-cancel="confirm.reject"
  >
    {{ confirm.content }}
  </BaseDialog>
</template>

<script setup lang="ts">
import BaseDialog from '@/widgets/baseDialog/ui/BaseDialog.vue';
import type { ConfirmArgs, ConfirmInstance } from '@/widgets/confirmDialog/types';

const confirm = ref<ConfirmInstance>({ modelValue: false });

const provideConfirm = (confirmArgs: ConfirmArgs): Promise<void> => {
  return new Promise((resolve, reject) => {
    confirm.value = {
      id: Symbol(),
      modelValue: true,
      resolve,
      reject,
      ...confirmArgs,
    };
  });
};

provide('confirm', provideConfirm);
</script>
