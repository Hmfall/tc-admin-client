<template>
  <slot />

  <v-snackbar
    v-model="isSnackbar"
    class="message-snackbar"
    location="top"
    rounded="md"
  >
    <v-alert
      class="message-alert"
      variant="tonal"
      density="comfortable"
      rounded="md"
      :type="message?.type"
    >
      <template
        v-if="message?.type"
        #prepend
      >
        <v-icon
          size="22"
          :icon="icons.get(message.type)"
          :color="message?.type === 'info' ? '#000000' : ''"
        />
      </template>

      {{ message?.value }}
    </v-alert>
  </v-snackbar>
</template>

<script setup lang="ts">
import type { MessageOptions } from '@/widgets/messageAlert/types';
import { MessageType } from '@/widgets/messageAlert/types';

const isSnackbar = ref(false);

const message = ref<MessageOptions>();

const pushMessage = (messageOptions: MessageOptions) => {
  message.value = messageOptions;
  isSnackbar.value = true;
};

provide('message', pushMessage);

const icons = new Map([
  [MessageType.success, '$mdiCheckCircleOutline'],
  [MessageType.warning, '$mdiAlertCircleOutline'],
  [MessageType.error, '$mdiAlertCircleOutline'],
  [MessageType.info, '$mdiAlertCircleOutline'],
]);
</script>

<style scoped lang="scss">
.message-alert {
  min-height: 52px;

  :deep(.v-alert__content) {
    color: #000000;
  }

  :deep(.v-alert__prepend) {
    height: 100%;
    margin-right: 10px;
  }
}

.message-snackbar {
  margin-top: 16px;

  :deep(.v-snackbar__content) {
    padding: 0;
  }

  :deep(.v-snackbar--variant-elevated) {
    background: transparent;
  }
}
</style>
