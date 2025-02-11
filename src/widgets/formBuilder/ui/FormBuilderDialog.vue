<template>
  <BaseDialog
    confirm-button="Сохранить"
    :model-value="modelValue"
    :actions="false"
    @after-leave="emit('onClose')"
    @update:model-value="(value: boolean) => emit('update:modelValue', value)"
  >
    <FormBuilder
      ref="formBuilderRef"
      :item="props.item"
      :fields="fields"
      :mode="mode"
      :model-constructor="modelConstructor"
      @on-create="onCreate"
      @on-update="onUpdate"
      @on-close="emit('update:modelValue', false)"
    />
  </BaseDialog>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import type { ClassConstructor } from 'class-transformer';
import type { BaseModel } from '@/shared/lib/storeFactory';
import BaseDialog from '@/widgets/baseDialog/ui/BaseDialog.vue';
import type { FormEditMode } from '@/widgets/formBuilder/types/common';
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
  (e: 'onCreate', item: T): void;
  (e: 'onUpdate', item: T): void;
  (e: 'onClose'): void;
}>();

const onCreate = (item: T) => {
  emit('onCreate', item);
  emit('update:modelValue', false);
};

const onUpdate = (item: T) => {
  emit('onUpdate', item);
  emit('update:modelValue', false);
};
</script>
