<template>
  <div>
    <v-img
      v-if="props.foreignKey"
      :src="value?.[props.foreignKey] as string"
      :width="$attrs['width'] as string"
      :class="{
        'mb-4': value?.[props.foreignKey],
        'h-0': !value?.[props.foreignKey],
      }"
    />

    <VFileInput
      v-bind="$attrs"
      :model-value="modelValue"
      hide-details
      @update:model-value="updateModelValue"
    />
  </div>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import type { Ref } from 'vue';
import { VFileInput } from 'vuetify/components';
import type { BaseModel } from '@/shared/lib/storeFactory';
import type { UpdateFormFieldValue } from '@/widgets/formBuilder/types/common';
import type { FileInputField } from '@/widgets/formBuilder/types/formBuilder';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<
  /* eslint-disable-next-line vue/no-reserved-props,vue/no-reserved-keys */
  FileInputField<T> & {
    modelValue: null;
    foreignKey?: string;
    item: T;
  }
>();

const snapshot = props.item.clone();

const value = ref(props.item.clone()) as Ref<T>;

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | File[]): void;
  (e: 'updateField', value: UpdateFormFieldValue<T>): void;
  (e: 'on-create-promise', promise: FunctionExpression<Promise<void>>): void;
}>();

const getPromise = () =>
  new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 1000),
  );

const updateModelValue = (file: File | File[]) => {
  if (props.foreignKey) {
    emit('updateField', {
      key: props.foreignKey,
      value: createObjectURL(value.value, file, props.foreignKey),
    });
  }

  emit('update:modelValue', file);
  emit('on-create-promise', getPromise);
};

const createObjectURL = (value: T, file: unknown, key: keyof T) => {
  if (String(value[key])?.startsWith('blob:')) {
    URL.revokeObjectURL(String(value[key]));
  }

  if (file) {
    const objectURL = URL.createObjectURL(file as Blob) as T[keyof T];
    value[key] = objectURL;
    return objectURL;
  } else {
    value[key] = snapshot[key];
    return snapshot[key];
  }
};
</script>
