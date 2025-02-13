<template>
  <BaseDialog
    confirm-button="Сохранить"
    :model-value="modelValue"
    :actions="false"
    @after-leave="emit('close')"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <FormBuilder
      :item="props.item"
      :fields="fields"
      :mode="mode"
      :model-constructor="modelConstructor"
      @create="(...args) => emit('create', ...args)"
      @update="(...args) => emit('update', ...args)"
      @submit="emit('update:modelValue', false)"
      @close="emit('update:modelValue', false)"
    />
  </BaseDialog>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import type { ClassConstructor } from 'class-transformer';
import type { BaseModel } from '@/shared/lib/storeFactory';
import BaseDialog from '@/widgets/baseDialog/ui/BaseDialog.vue';
import type { FormEditMode, UpdateFormFieldPromise } from '@/widgets/formBuilder/types/common';
import type { FormBuilderFields } from '@/widgets/formBuilder/types/formBuilder';
import FormBuilder from '@/widgets/formBuilder/ui/FormBuilder.vue';

const props = defineProps<{
  modelValue: boolean;
  item: T | null;
  modelConstructor?: ClassConstructor<T>;
  fields?: FormBuilderFields<T>;
  mode?: FormEditMode;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
  (e: 'create', item: T, promises: UpdateFormFieldPromise<T>[]): void;
  (e: 'update', item: T, promises: UpdateFormFieldPromise<T>[]): void;
  (e: 'close'): void;
}>();
</script>
