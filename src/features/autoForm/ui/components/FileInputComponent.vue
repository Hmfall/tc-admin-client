<template>
  <div class="w-100">
    <v-img
      v-if="isObjectURL(modelValue)"
      :src="objectUrl?.objectUrl ?? objectUrl?.url"
      :width="$attrs['width'] as string"
      max-height="282"
      :class="objectUrl?.objectUrl ?? objectUrl?.url ? 'mb-4' : 'h-0'"
    />

    <VFileInput
      v-if="isObjectURL(modelValue)"
      v-bind="$attrs"
      :model-value="modelValue.file"
      :rules="objectURLRules"
      @update:model-value="updateModelValue"
    />

    <VFileInput
      v-else
      v-bind="$attrs"
      :model-value="modelValue"
      @update:model-value="updateModelValue"
    />
  </div>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import { VFileInput } from 'vuetify/components';
import type {
  FileInputField,
  UpdateAutoFormFieldPromiseMappedKey,
} from '@/features/autoForm/model/types';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';
import type { BaseModel } from '@/shared/lib/storeFactory';
import { requiredObjectUrlRule } from '@/shared/utils/validationRules';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<
  // eslint-disable-next-line vue/no-reserved-props,vue/no-reserved-keys,vue/prop-name-casing
  FileInputField & {
    modelValue: ObjectUrl | File;
    item: T;
    fieldKey: keyof T;
    rules?: FileInputField['rules'];
  }
>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: File | ObjectUrl): void;
  (e: 'create-promise', promise: UpdateAutoFormFieldPromiseMappedKey<T>): void;
}>();

const isObjectURL = (value?: ObjectUrl | File): value is ObjectUrl => {
  return value instanceof ObjectUrl;
};

const objectUrl = computed(() => {
  const value = props.item[props.fieldKey] as ObjectUrl | File;

  if (isObjectURL(value)) {
    return value;
  }

  return null;
});

const objectURLRules = computed(() => {
  return (
    props?.rules?.map((item) => {
      return item === requiredObjectUrlRule
        ? () => requiredObjectUrlRule(props.modelValue as ObjectUrl)
        : item;
    }) ?? []
  );
});

const getObjectUrlPromise = (obj: ObjectUrl): UpdateAutoFormFieldPromiseMappedKey<T> => {
  const formData = new FormData();

  formData.append('file', obj.file!);

  return {
    key: props.fieldKey,
    fn: () =>
      ObjectUrl.$api.createObjectUrl(formData).then((value) => {
        value.objectUrl = obj.objectUrl;
        return { key: props.fieldKey, value };
      }),
  };
};

const updateModelValue = (file?: File | File[]) => {
  if (Array.isArray(file)) {
    return;
  }

  if (objectUrl.value) {
    const obj = objectUrl.value.clone();

    obj.file = file ?? null;
    obj.updateObjectURL(file);

    emit('update:modelValue', obj);
    emit('create-promise', getObjectUrlPromise(obj));
  } else {
    if (file instanceof File) {
      emit('update:modelValue', file);
    }
  }
};
</script>
