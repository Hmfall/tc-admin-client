<template>
  <AuthFormLayout @submit="onSubmit">
    <template #title>
      <span class="text-h6">Авторизация</span>
    </template>

    <InputLayout label="Логин или Email">
      <v-text-field
        v-model="signInRequestBody.credentials"
        autocomplete="email"
        :rules="[requiredRule]"
      />
    </InputLayout>

    <InputLayout label="Пароль">
      <v-text-field
        v-model="signInRequestBody.password"
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
    </InputLayout>

    <template #submit>
      <v-btn
        type="submit"
        min-width="180"
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
import { isAxiosError } from 'axios';
import { AppRoutes } from '@/app/providers/router/appRoutes';
import type { SignInRequest } from '@/features/auth/model/types';
import { useAuthFormState } from '@/features/auth/store/useAuthFormState';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import AuthFormLayout from '@/features/auth/ui/AuthFormLayout.vue';
import { useMessage } from '@/shared/components/messageAlert/model/useMessage';
import { useLoading } from '@/shared/composables/useLoading/useLoading';
import InputLayout from '@/shared/ui/input/InputLayout.vue';
import { requiredRule } from '@/shared/utils/validationRules';

const router = useRouter();

const message = useMessage();
const { isLoading, withLoading } = useLoading();
const [showPassword, toggleShowPassword] = useToggle();

const authStore = useAuthStore();

const signInRequestBody = ref<SignInRequest>({
  credentials: '',
  password: '',
});

const onSubmit = async () => {
  await withLoading(authStore.authorize(signInRequestBody.value))
    .then(() => router.replace('/'))
    .catch((e) => {
      if (isAxiosError(e)) {
        message.error(
          e.response?.status === 403
            ? 'Произошла ошибка! Неверный логин или пароль.'
            : 'Произошла ошибка!',
        );
      }
    });
};

onMounted(() => {
  signInRequestBody.value.credentials = useAuthFormState().credentials.value;
  useAuthFormState().resetCredentials();
});
</script>
