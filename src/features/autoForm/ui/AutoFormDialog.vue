<template>
  <BaseDialog
    :model-value="modelValue"
    :actions="false"
    :dialog-width="dialogWidth"
    @after-leave="emit('close')"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template
      v-if="$slots.header"
      #header
    >
      <slot name="header" />
    </template>

    <AutoForm
      :value="props.value"
      :fields="formFields"
      :mode="mode"
      :model="model"
      :loading="loading"
      :disabled="disabled"
      @create="(...args) => emit('create', ...args)"
      @update="(...args) => emit('update', ...args)"
      @close="emit('update:modelValue', false)"
    />
  </BaseDialog>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import type { ClassConstructor } from 'class-transformer';
import type {
  AutoFormFields,
  FormEditMode,
  UpdateAutoFormFieldPromise,
} from '@/features/autoForm/model/types';
import AutoForm from '@/features/autoForm/ui/AutoForm.vue';
import type { BaseModel } from '@/shared/lib/storeFactory';
import BaseDialog from '@/shared/ui/baseDialog/BaseDialog.vue';

const props = defineProps<{
  modelValue?: boolean;
  value: T | null;
  model?: ClassConstructor<T>;
  formFields?: AutoFormFields<T>;
  mode?: FormEditMode;
  loading?: boolean;
  disabled?: boolean;
  editor?: boolean;
  dialogWidth?: string | number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
  (e: 'create', value: T, promises: UpdateAutoFormFieldPromise<T>[]): void;
  (e: 'update', value: T, promises: UpdateAutoFormFieldPromise<T>[]): void;
  (e: 'close'): void;
}>();
</script>
