<template>
  <AuthFormLayout @submit="onSubmit">
    <template #title>
      <span class="text-h6">Восстановление данных</span>
    </template>

    <v-text-field
      v-model="resetPasswordPayload.email"
      label="Email"
      autocomplete="email"
      placeholder="Введите email"
      :rules="[requiredRule]"
    />

    <template #submit>
      <v-btn
        type="submit"
        width="180"
        variant="flat"
        color="primary"
        :loading="isLoading"
      >
        Сбросить пароль
      </v-btn>
    </template>

    <template #actions>
      <router-link :to="{ name: AppRoutes.Auth }">
        <span class="text-decoration-underline cursor-pointer">Назад</span>
      </router-link>
    </template>
  </AuthFormLayout>
</template>

<script setup lang="ts">
import { AppRoutes } from '@/app/providers/router/appRoutes';
import type { ResetPasswordPayload } from '@/features/auth/model/types';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import AuthFormLayout from '@/features/auth/ui/AuthFormLayout.vue';
import { useMessage } from '@/shared/components/messageAlert/model/useMessage';
import { useLoading } from '@/shared/composables/useLoading/useLoading';
import { requiredRule } from '@/shared/utils/validationRules';

const message = useMessage();
const { isLoading, withLoading } = useLoading();

const authStore = useAuthStore();

const resetPasswordPayload = reactive<ResetPasswordPayload>({});

const onSubmit = async () => {
  await withLoading(authStore.resetPassword(resetPasswordPayload))
    .then(() => {})
    .catch(() => message.error('Ошибка.'));
};
</script>
