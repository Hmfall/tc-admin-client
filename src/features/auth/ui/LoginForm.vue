<template>
  <VForm
    ref="loginFormRef"
    @submit.prevent="onSubmit"
  >
    <div class="d-flex align-center flex-column">
      <div class="mb-6 text-center">
        <span class="text-h5">Авторизация</span>
      </div>
      <v-sheet
        width="500"
        class="d-flex flex-column justify-center ga-2 mb-2"
      >
        <v-text-field
          v-model="loginData.username"
          label="Email"
          placeholder="Введите email"
          :rules="[validationRules.required]"
        />
        <v-text-field
          v-model="loginData.password"
          label="Пароль"
          placeholder="Введите пароль"
          :rules="[validationRules.required]"
        />
      </v-sheet>
      <div class="d-flex justify-center mb-6">
        <v-btn
          width="160"
          type="submit"
          variant="flat"
          color="primary"
        >
          Войти
        </v-btn>
      </div>
      <div>
        <span class="text-decoration-underline cursor-pointer">Восстановить данные</span>
      </div>
    </div>
  </VForm>
</template>

<script setup lang="ts">
import { VForm } from 'vuetify/components';
import LoginData from '@/features/auth/model/LoginData';
import { validationRules } from '@/shared/utils/validationRules';

const loginFormRef = ref<VForm | null>(null);
const loginData = reactive(new LoginData());

const onSubmit = async () => {
  if (!loginFormRef.value) {
    return;
  }

  loginFormRef.value.validate().then(({ valid }) => {});
};
</script>
