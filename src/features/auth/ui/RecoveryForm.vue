<template>
  <AuthFormLayout @submit="onSubmit">
    <template #title>
      <span class="text-h6">Восстановление данных</span>
    </template>

    <InputLayout label="Email">
      <v-text-field
        v-model="recoveryRequestBody.email"
        autocomplete="email"
        :rules="emailRules"
      />
    </InputLayout>

    <template #submit>
      <v-btn
        type="submit"
        variant="flat"
        color="primary"
        :loading="isLoading"
      >
        Отправить временный пароль
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
import type { RecoveryRequest } from '@/features/auth/model/types';
import { useAuthFormState } from '@/features/auth/store/useAuthFormState';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import AuthFormLayout from '@/features/auth/ui/AuthFormLayout.vue';
import { useMessage } from '@/shared/components/messageAlert/model/useMessage';
import { useLoading } from '@/shared/composables/useLoading/useLoading';
import InputLayout from '@/shared/ui/input/InputLayout.vue';
import { emailRules } from '@/shared/utils/validationRules';

const router = useRouter();

const message = useMessage();
const { isLoading, withLoading } = useLoading();

const authStore = useAuthStore();

const recoveryRequestBody = ref<RecoveryRequest>({ email: '' });

const onSubmit = async () => {
  await withLoading(authStore.recovery(recoveryRequestBody.value))
    .then(async () => {
      useAuthFormState().setCredentials(recoveryRequestBody.value.email);
      message.info('Временный пароль отправлен на Ваш email.');
      await router.replace({ name: AppRoutes.Auth });
    })
    .catch(() => message.error('Произошла ошибка!'));
};
</script>
