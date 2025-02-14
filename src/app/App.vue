<template>
  <v-app>
    <v-layout>
      <component :is="layout" />
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import EmptyLayout from '@/app/layouts/EmptyLayout.vue';
import '@/shared/assets/styles/index.scss';

const route = useRoute();

const layout = computed(() => route.meta?.layout || EmptyLayout);
</script>
