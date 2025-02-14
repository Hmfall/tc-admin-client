<template>
  <BaseDialog
    confirm-button="Сохранить"
    :model-value="modelValue"
    :actions="false"
    :dialogWidth="dialogWidth"
    @after-leave="emit('close')"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <FormBuilder
      :item="props.item"
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
import BaseDialog from '@/widgets/baseDialog/ui/BaseDialog.vue';
import type {
  FormBuilderFields,
  FormEditMode,
  UpdateFormFieldPromise,
} from '@/widgets/formBuilder/types';
import FormBuilder from '@/widgets/formBuilder/ui/FormBuilder.vue';

const props = defineProps<{
  modelValue?: boolean;
  item: T | null;
  model?: ClassConstructor<T>;
  formFields?: FormBuilderFields<T>;
  mode?: FormEditMode;
  loading?: boolean;
  dialogWidth?: string | number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
  (e: 'create', item: T, promises: UpdateFormFieldPromise<T>[]): void;
  (e: 'update', item: T, promises: UpdateFormFieldPromise<T>[]): void;
  (e: 'close'): void;
}>();
</script>
