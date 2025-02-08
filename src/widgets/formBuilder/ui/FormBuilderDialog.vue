<template>
  <BaseDialog
    confirm-button="Сохранить"
    :model-value="modelValue"
    @on-confirm="onConfirm"
    @after-leave="emit('onClose')"
    @update:model-value="(value: boolean) => emit('update:modelValue', value)"
  >
    <FormBuilder
      ref="formBuilder"
      :item="props.item"
      :fields="fields"
      :mode="mode"
      :model-constructor="modelConstructor"
      @on-sumbit="$emit('onSumbit', $event)"
      @on-create="$emit('onCreate', $event)"
      @on-update="$emit('onUpdate', $event)"
    />
  </BaseDialog>
</template>

<script setup lang="ts" , generic="T extends BaseModel">
import { ref } from 'vue';
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
  (e: 'onSumbit', item: T): void;
  (e: 'onCreate', item: T): void;
  (e: 'onUpdate', item: T): void;
  (e: 'onClose'): void;
}>();

/* eslint-disable-next-line no-undef */
const formBuilder = ref<ComponentInstance<typeof FormBuilder> | null>(null);

const onConfirm = () => {
  formBuilder.value?.onSubmit();
};
</script>
