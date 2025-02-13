<template>
  <div>
    <v-img
      v-if="isObjectURL(modelValue)"
      :src="baseObjectURL?.objectURL ?? baseObjectURL?.url"
      :width="$attrs['width'] as string"
      :class="baseObjectURL ? 'mb-4' : 'h-0'"
    />

    <VFileInput
      v-if="isObjectURL(modelValue)"
      v-bind="$attrs"
      :model-value="modelValue.file"
      hide-details
      @update:model-value="updateModelValue"
    />

    <VFileInput
      v-else
      v-bind="$attrs"
      :model-value="modelValue"
      hide-details
      @update:model-value="updateModelValue"
    />
  </div>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import { VFileInput } from 'vuetify/components';
import { ObjectUrlAPI } from '@/entities/objectURL/api/ObjectUrlAPI';
import { ObjectUrl } from '@/entities/objectURL/model/ObjectUrl';
import type { BaseModel } from '@/shared/lib/storeFactory';
import type {
  UpdateFormFieldPromise,
  UpdateFormFieldValue,
} from '@/widgets/formBuilder/types/common';
import type { FileInputField } from '@/widgets/formBuilder/types/formBuilder';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<
  /* eslint-disable-next-line vue/no-reserved-props,vue/no-reserved-keys */
  FileInputField<T> & {
    modelValue: ObjectUrl | File;
    item: T;
    fieldKey: keyof T;
  }
>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | ObjectUrl): void;
  (e: 'create-promise', promise: UpdateFormFieldPromise<T>): void;
}>();

const objectUrlAPI = new ObjectUrlAPI();

const isObjectURL = (value?: ObjectUrl | File): value is ObjectUrl => {
  return value instanceof ObjectUrl;
};

const baseObjectURL = computed(() => {
  const value = props.item[props.fieldKey] as ObjectUrl | File;

  if (isObjectURL(value)) {
    return value;
  }

  return null;
});

const getObjectUrlAPIFn = async (obj: ObjectUrl): Promise<UpdateFormFieldValue<T>> => {
  return objectUrlAPI.createObjectUrl(obj.file).then((value) => {
    value.objectURL = obj.objectURL;
    return { key: props.fieldKey, value };
  });
};

const updateModelValue = (file?: File | File[]) => {
  if (Array.isArray(file)) {
    return;
  }

  if (baseObjectURL.value) {
    const objectURL = baseObjectURL.value.clone();
    objectURL.file = file;
    objectURL.updateObjectURL(file);
    emit('update:modelValue', objectURL);
    emit('create-promise', () => getObjectUrlAPIFn(objectURL));
  } else {
    if (file instanceof File) {
      emit('update:modelValue', file);
    }
  }
};
</script>
