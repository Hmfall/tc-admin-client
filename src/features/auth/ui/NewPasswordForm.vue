<template>
  <AuthFormLayout @submit="onSubmit">
    <template #title>
      <span class="text-h6">Восстановление данных</span>
    </template>

    <v-text-field
      v-model="passwords.password.value"
      label="Новый пароль"
      placeholder="Введите новый пароль"
      autocomplete="password"
      :type="showPassword ? 'text' : 'password'"
      :icon="showPassword ? '$mdiEyeOffOutline' : '$mdiEyeOutline'"
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

    <v-text-field
      v-model="passwords.repeatPassword.value"
      label="Повторите новый пароль"
      placeholder="Введите новый пароль"
      autocomplete="repeatPassword"
      :type="showRepeatPassword ? 'text' : 'password'"
      :icon="showRepeatPassword ? '$mdiEyeOffOutline' : '$mdiEyeOutline'"
      :rules="[requiredRule]"
    >
      <template #append-inner>
        <v-icon
          size="20"
          :icon="showRepeatPassword ? '$mdiEyeOffOutline' : '$mdiEyeOutline'"
          @click="toggleShowRepeatPassword()"
        />
      </template>
    </v-text-field>

    <template #submit>
      <v-btn
        type="submit"
        width="180"
        variant="flat"
        color="primary"
      >
        Сохранить
      </v-btn>
    </template>
  </AuthFormLayout>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core';
import type { AuthPayload } from '@/features/auth/model/types';
import AuthFormLayout from '@/features/auth/ui/AuthFormLayout.vue';
import { requiredRule } from '@/shared/utils/validationRules';

interface Password {
  useToggle: ReturnType<typeof useToggle>;
  value?: AuthPayload['password'];
}

const passwords = ref<{
  password: Password;
  repeatPassword: Password;
}>({
  password: {
    useToggle: useToggle(),
  },
  repeatPassword: {
    useToggle: useToggle(),
  },
});

const [showPassword, toggleShowPassword] = passwords.value.password.useToggle;
const [showRepeatPassword, toggleShowRepeatPassword] = passwords.value.repeatPassword.useToggle;

const onSubmit = async () => {};
</script>
