<template>
  <AppDrawer v-model="isDrawerExpanded" />

  <v-main>
    <router-view />
  </v-main>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import AppDrawer from '@/widgets/appDrawer/ui/AppDrawer.vue';

const isDrawerExpanded = ref(useDisplay().lgAndUp.value ?? false);

provide('drawerExpanded', {
  updateDrawerExpanded: (value: boolean) => {
    isDrawerExpanded.value = value;
  },
});
</script>
