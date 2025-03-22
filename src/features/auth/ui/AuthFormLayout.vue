<template>
  <VForm
    ref="formRef"
    v-model="isFormValid"
    :validate-on="validateOn"
    @submit.prevent="onSubmit"
  >
    <div class="d-flex flex-column align-center">
      <div class="mb-6 text-center">
        <slot name="title" />
      </div>

      <v-sheet
        class="d-flex flex-column mb-2"
        width="400"
      >
        <slot />
      </v-sheet>

      <div class="d-flex justify-center mb-6">
        <slot name="submit" />
      </div>

      <slot name="actions" />
    </div>
  </VForm>
</template>

<script setup lang="ts">
import { VForm } from 'vuetify/components';
import { useForm } from '@/shared/composables/useForm/useForm';

const emit = defineEmits<{
  (e: 'submit'): void;
}>();

const { formRef, handleSubmit, validateOn, isFormValid } = useForm();

const onSubmit = handleSubmit(() => emit('submit'));
</script>
