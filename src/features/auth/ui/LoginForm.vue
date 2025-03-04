<template>
  <AuthFormLayout @submit="onSubmit">
    <template #title>
      <span class="text-h6">Авторизация</span>
    </template>

    <v-text-field
      v-model="authPayload.email"
      label="Email"
      autocomplete="email"
      placeholder="Введите email"
      :rules="[requiredRule]"
    />

    <v-text-field
      v-model="authPayload.password"
      label="Пароль"
      placeholder="Введите пароль"
      autocomplete="password"
      :type="showPassword ? 'text' : 'password'"
      :rules="[requiredRule]"
    >
      <template #append-inner>
        <v-icon
          size="20"
          :icon="showPassword ? '$mdiEyeOffOutline' : '$mdiEyeOutline'"
          @click="toggleShowPassword()"
        />
      </template>
    </v-text-field>

    <template #submit>
      <v-btn
        type="submit"
        width="180"
        variant="flat"
        color="primary"
        :loading="isLoading"
      >
        Войти
      </v-btn>
    </template>

    <template #actions>
      <router-link :to="{ name: AppRoutes.ResetPassword }">
        <span class="text-decoration-underline cursor-pointer">Восстановить данные</span>
      </router-link>
    </template>
  </AuthFormLayout>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import { AppRoutes } from '@/app/providers/router/appRoutes';
import type { AuthPayload } from '@/features/auth/model/types';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import AuthFormLayout from '@/features/auth/ui/AuthFormLayout.vue';
import { useMessage } from '@/shared/components/messageAlert/model/useMessage';
import { useLoading } from '@/shared/composables/useLoading/useLoading';
import { requiredRule } from '@/shared/utils/validationRules';

const router = useRouter();
const message = useMessage();
const { isLoading, withLoading } = useLoading();
const [showPassword, toggleShowPassword] = useToggle();

const authStore = useAuthStore();

const authPayload = ref<AuthPayload>({});

const onSubmit = async () => {
  await withLoading(authStore.authorize(authPayload.value))
    .then(() => router.replace('/'))
    .catch(() => message.error('Ошибка.'));
};
</script>
