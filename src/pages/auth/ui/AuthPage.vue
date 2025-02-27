<template>
  <v-container class="d-flex justify-center align-center">
    <template v-if="route.name">
      <component :is="authComponent[route.name]" />
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { AppRoutes } from '@/app/providers/router/appRoutes';

const route = useRoute();

const authComponent = computed<Record<RouteRecordName, Component>>(() => ({
  [AppRoutes.auth]: defineAsyncComponent(() => import('@/features/auth/ui/LoginForm.vue')),
  [AppRoutes.resetPassword]: defineAsyncComponent(
    () => import('@/features/auth/ui/ResetPasswordForm.vue'),
  ),
  [AppRoutes.newPassword]: defineAsyncComponent(
    () => import('@/features/auth/ui/NewPasswordForm.vue'),
  ),
}));
</script>
