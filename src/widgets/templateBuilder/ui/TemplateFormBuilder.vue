<template>
  <div class="d-flex flex-column ga-10">
    <TemplateBuilder
      v-for="(item, i) in items"
      :key="(item[item.primaryKey] as PropertyKey) ?? i"
      :item="item"
      :builder="templateBuilder"
      @on-edit-item="onEditItem"
    />
  </div>

  <FormBuilderDialog
    v-model="isEditModalLocal"
    :item="updatedItem"
    :fields="formBuilder"
    :mode="mode"
    :model-constructor="modelConstructor"
    @on-update="onUpdateItem"
    @on-close="onClose"
    @on-create="onCreateItem"
    @update:model-value="(value) => emit('update:isModal', value)"
  />
</template>

<script setup lang="ts" , generic="T extends Model">
import type { Ref } from 'vue';
import type { ClassConstructor } from 'class-transformer';
import type { Model } from '@/shared/lib/storeFactory';
import type { FormEditMode } from '@/widgets/formBuilder/types/common';
import type { FormBuilderFields } from '@/widgets/formBuilder/types/formBuilder';
import FormBuilderDialog from '@/widgets/formBuilder/ui/FormBuilderDialog.vue';
import type { CommonTemplateBuilder } from '@/widgets/templateBuilder/types';
import TemplateBuilder from '@/widgets/templateBuilder/ui/TemplateBuilder.vue';

const props = withDefaults(
  defineProps<{
    items?: T[];
    isModal: boolean;
    templateBuilder: CommonTemplateBuilder<T>;
    formBuilder: FormBuilderFields<T>;
    modelConstructor: ClassConstructor<T>;
  }>(),
  {
    items: () => [],
  },
);

const emit = defineEmits<{
  (e: 'update:isModal', value: boolean): void;
}>();

const updatedItem = ref<T | null>(new props.modelConstructor()) as Ref<T | null>;

const mode = ref<FormEditMode>();

const isEditModalLocal = ref(props.isModal);

const onEditItem = (item: T) => {
  mode.value = 'update';
  updatedItem.value = item;
  isEditModalLocal.value = true;
};

const onUpdateItem = (item: T) => {
  updatedItem.value?.merge(item);
};

const onCreateItem = (item: T) => {};

const onClose = () => {
  updatedItem.value = null;
};

watch(
  () => props.isModal,
  (value) => {
    mode.value = 'create';
    isEditModalLocal.value = value;
  },
);
</script>
