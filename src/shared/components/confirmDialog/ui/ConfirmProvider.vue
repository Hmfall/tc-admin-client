<template>
  <slot />

  <BaseDialog
    :key="confirm.id"
    v-model="confirm.modelValue"
    compact
    :dialog-width="560"
    :close-icon="false"
    :persistent="false"
    :confirm-button="confirm.confirmBtn"
    :cancel-button="confirm.cancelBtn"
    :text="htmlToString(confirm.message) ?? undefined"
    :icon="confirm.icon"
    @on-confirm="confirm.resolve"
    @on-cancel="confirm.reject"
  />
</template>

<script setup lang="ts">
import type {
  ConfirmInstance,
  ConfirmOptions,
} from '@/shared/components/confirmDialog/model/types';
import BaseDialog from '@/shared/ui/baseDialog/ui/BaseDialog.vue';
import { htmlToString } from '@/shared/utils';

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
