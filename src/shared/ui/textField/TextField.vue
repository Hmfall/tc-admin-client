<template>
  <InputLayout :label="label">
    <template #header>
      <slot name="header" />
    </template>

    <slot
      v-if="$slots.input"
      name="input"
    />

    <VTextField
      v-else
      v-bind="$attrs"
      :label="undefined"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </InputLayout>
</template>

<script setup lang="ts">
import { VTextField } from 'vuetify/components';
import InputLayout from '@/shared/ui/input/InputLayout.vue';

type VTextFieldProps = VTextField['$props'];

interface Props extends /* @vue-ignore */ VTextFieldProps {}

defineOptions({
  inheritAttrs: false,
});

defineProps<
  Props & {
    modelValue?: VTextFieldProps['modelValue'];
    label?: VTextFieldProps['label'];
  }
>();

defineEmits<{
  (e: 'update:modelValue', modelValue: unknown): void;
}>();
</script>
