<template>
  <v-app>
    <v-layout>
      <v-main>
        <ConfirmProvider>
          <router-view />
        </ConfirmProvider>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import ConfirmProvider from '@/widgets/confirmDialog/ui/ConfirmProvider.vue';
import '@/shared/assets/styles/index.scss';
</script>
