<template>
  <VForm
    ref="formRef"
    v-model="isFormValid"
    :validate-on="validateOn"
    @submit.prevent="onSubmit"
  >
    <AutoFormLayout :fields="fields">
      <template #fields="{ field }">
        <component
          :is="field.render()"
          v-model="thisValue[field.key]"
          :item="thisValue"
          :field-key="field.key"
          :disabled="disabled"
          v-bind="field.props"
          class="input-class"
          @create-promise="onCreatePromise"
        />
      </template>
    </AutoFormLayout>

    <slot
      v-if="$slots.actions"
      name="actions"
      v-bind="{ reset: thisValue.resetToSnapshot() }"
    />

    <ActionButtons
      v-else
      class="mt-2 px-4"
      primary-button="Сохранить"
      :loading-primary-button="loading"
      @on-secondary-click="emit('close')"
    />
  </VForm>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import type { ClassConstructor } from 'class-transformer';
import type {
  AutoFormFields,
  FormEditMode,
  UpdateAutoFormFieldPromise,
  UpdateAutoFormFieldPromiseMappedKey,
  UpdateAutoFormFieldValue,
} from '@/features/autoForm/model/types';
import AutoFormLayout from '@/features/autoForm/ui/AutoFormLayout.vue';
import { useForm } from '@/shared/composables/useForm/useForm';
import type { BaseModel } from '@/shared/lib/storeFactory';
import ActionButtons from '@/shared/ui/actionButtons/ActionButtons.vue';

const props = defineProps<{
  value: T | null;
  fields?: AutoFormFields<T>;
  model?: ClassConstructor<T>;
  mode?: FormEditMode;
  loading?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'create', value: T, promises: UpdateAutoFormFieldPromise<T>[]): void;
  (e: 'update', value: T, promises: UpdateAutoFormFieldPromise<T>[]): void;
  (e: 'close'): void;
}>();

const { formRef, handleSubmit, isFormValid, validateOn } = useForm({
  initial: props.mode === 'update',
});

const thisValue = ref(props.value?.clone() ?? (props?.model && new props.model())) as Ref<T>;

const promises = ref<Map<UpdateAutoFormFieldValue<T>['key'], UpdateAutoFormFieldPromise<T>>>(
  new Map(),
);

const onSubmit = handleSubmit(() => {
  if (props.mode === 'create') {
    emit('create', thisValue.value, [...promises.value.values()]);
  } else if (props.mode === 'update') {
    emit('update', thisValue.value, [...promises.value.values()]);
  }
});

const onCreatePromise = (promise?: UpdateAutoFormFieldPromiseMappedKey<T>) => {
  if (promise) {
    promises.value.set(promise.key, promise.fn);
  }
};

watch(
  () => props.value,
  (value) => thisValue.value.merge(value),
  { deep: true },
);
</script>
