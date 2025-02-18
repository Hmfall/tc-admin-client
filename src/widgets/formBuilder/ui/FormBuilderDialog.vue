<template>
  <BaseDialog
    :model-value="modelValue"
    :actions="false"
    :dialog-width="dialogWidth"
    @after-leave="emit('close')"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <FormBuilder
      :value="props.value"
      :fields="formFields"
      :mode="mode"
      :model="model"
      :loading="loading"
      @create="(...args) => emit('create', ...args)"
      @update="(...args) => emit('update', ...args)"
      @close="emit('update:modelValue', false)"
    />
  </BaseDialog>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import type { ClassConstructor } from 'class-transformer';
import type { BaseModel } from '@/shared/lib/storeFactory';
import BaseDialog from '@/shared/ui/baseDialog/BaseDialog.vue';
import type {
  FormBuilderFields,
  FormEditMode,
  UpdateFormFieldPromise,
} from '@/widgets/formBuilder/types';
import FormBuilder from '@/widgets/formBuilder/ui/FormBuilder.vue';

const props = defineProps<{
  modelValue?: boolean;
  value: T | null;
  model?: ClassConstructor<T>;
  formFields?: FormBuilderFields<T>;
  mode?: FormEditMode;
  loading?: boolean;
  dialogWidth?: string | number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
  (e: 'create', value: T, promises: UpdateFormFieldPromise<T>[]): void;
  (e: 'update', value: T, promises: UpdateFormFieldPromise<T>[]): void;
  (e: 'close'): void;
}>();
</script>
