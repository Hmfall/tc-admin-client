<template>
  <VForm
    ref="formRef"
    v-model="isFormValid"
    :validate-on="validateOn"
    @submit.prevent="onSubmit"
  >
    <div class="d-flex flex-column align-center">
      <div class="mb-6 text-center">
        <span class="text-h5">Авторизация</span>
      </div>

      <v-sheet
        width="400"
        class="d-flex flex-column ga-2 mb-2"
      >
        <v-text-field
          v-model="authPayload.email"
          label="Email"
          autocomplete="email"
          placeholder="Введите email"
          :rules="[requiredRule]"
        />

        <v-text-field
          ref="passwordInput"
          v-model="authPayload.password"
          label="Пароль"
          placeholder="Введите пароль"
          autocomplete="password"
          :type="showPassword ? 'text' : 'password'"
          :rules="[requiredRule]"
        >
          <template
            v-if="authPayload.password"
            #append-inner
          >
            <v-icon
              size="20"
              icon="$mdiEyeOutline"
              @click="toggleShowPassword"
            />
          </template>
        </v-text-field>
      </v-sheet>

      <div class="d-flex justify-center mb-6">
        <v-btn
          type="submit"
          width="180"
          variant="flat"
          color="primary"
          :loading="isLoading"
        >
          Войти
        </v-btn>
      </div>

      <div>
        <span
          class="text-decoration-underline cursor-pointer"
          @click="onResetPassword"
        >
          Восстановить данные
        </span>
      </div>
    </div>
  </VForm>
</template>

<script setup lang="ts">
import { onClickOutside, useToggle } from '@vueuse/core';
import { VForm } from 'vuetify/components';
import type { AuthPayload } from '@/features/auth/model/types';
import { useAuth } from '@/features/auth/model/useAuth';
import { useMessage } from '@/shared/components/messageAlert/model/useMessage';
import { useForm } from '@/shared/composables/useForm/useForm';
import { useLoading } from '@/shared/composables/useLoading/useLoading';
import { requiredRule } from '@/shared/utils/validationRules';

const auth = useAuth();
const router = useRouter();

const message = useMessage();
const { isLoading, withLoading } = useLoading();
const { formRef, handleSubmit, validateOn, isFormValid } = useForm();

const [showPassword, toggleShowPassword] = useToggle();
const passwordInput = useTemplateRef<HTMLElement>('passwordInput');

const authPayload = reactive<AuthPayload>({});

const onSubmit = handleSubmit(async () => {
  await withLoading(auth.authorize(authPayload))
    .then(() => router.replace('/'))
    .catch(() => message.error('Неверный email или пароль.'));
});

const onResetPassword = () => {
  message.warning('В разработке!');
};

onClickOutside(passwordInput, () => {
  if (showPassword.value) {
    showPassword.value = false;
  }
});
</script>
