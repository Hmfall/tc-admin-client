<template>
  <slot />

  <BaseDialog
    :key="confirm.id"
    v-model="confirm.modelValue"
    compact
    :dialog-width="560"
    :close-icon="false"
    :persistent="false"
    :confirm-button="confirm.confirmText"
    :cancel-button="confirm.cancelText"
    @on-confirm="confirm.resolve"
    @on-cancel="confirm.reject"
  >
    <div class="d-flex align-center mb-3 mt-1">
      <v-icon
        class="mr-2"
        size="24"
        icon="$mdiAlertCircleOutline"
      />

      <span class="text-body-1">
        {{ confirm.content }}
      </span>
    </div>
  </BaseDialog>
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
