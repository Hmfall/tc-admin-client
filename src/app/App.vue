<template>
  <v-app>
    <v-layout>
      <ConfirmProvider>
        <MessageProvider>
          <component :is="layout" />
        </MessageProvider>
      </ConfirmProvider>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import EmptyLayout from '@/app/layouts/EmptyLayout.vue';
import '@/shared/assets/styles/index.scss';
import ConfirmProvider from '@/widgets/confirmDialog/ui/ConfirmProvider.vue';
import MessageProvider from '@/widgets/messageAlert/ui/MessageProvider.vue';

const route = useRoute();

const layout = computed(() => route.meta?.layout || EmptyLayout);
</script>
