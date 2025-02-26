<template>
  <VForm
    ref="formRef"
    v-model="isFormValid"
    :validate-on="validateOn"
    @submit.prevent="onSubmit"
  >
    <FormBuilderLayout :fields="fields">
      <template #fields="{ field }">
        <component
          :is="field.render()"
          v-model="thisValue[field.key]"
          :item="thisValue"
          :field-key="field.key"
          v-bind="field.props"
          @create-promise="onCreatePromise"
        />
      </template>
    </FormBuilderLayout>

    <slot
      v-if="$slots.actions"
      name="actions"
      v-bind="{ reset: resetValue }"
    />

    <ActionButtons
      v-else
      confirm-button="Сохранить"
      :loading="loading"
      @cancel="emit('close')"
    />
  </VForm>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import type { ClassConstructor } from 'class-transformer';
import { VForm } from 'vuetify/components';
import type {
  FormBuilderFields,
  FormEditMode,
  UpdateFormFieldPromise,
} from '@/shared/components/formBuilder/model/types';
import FormBuilderLayout from '@/shared/components/formBuilder/ui/FormBuilderLayout.vue';
import { useForm } from '@/shared/composables/useForm/useForm';
import type { BaseModel } from '@/shared/lib/storeFactory';
import ActionButtons from '@/shared/ui/actionButtons/ActionButtons.vue';

const props = defineProps<{
  value: T | null;
  fields?: FormBuilderFields<T>;
  model?: ClassConstructor<T>;
  mode?: FormEditMode;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:value', value: T): void;
  (e: 'create', value: T, promises: UpdateFormFieldPromise<T>[]): void;
  (e: 'update', value: T, promises: UpdateFormFieldPromise<T>[]): void;
  (e: 'close'): void;
}>();

const { formRef, handleSubmit, isFormValid, validateOn } = useForm({
  initial: props.mode === 'update' ?? false,
});

const thisValue = ref(props.value?.clone() ?? (props?.model && new props.model())) as Ref<T>;

const promises = ref<UpdateFormFieldPromise<T>[]>([]);

const onSubmit = handleSubmit(() => {
  if (props.mode === 'create') {
    emit('create', thisValue.value, promises.value);
  } else if (props.mode === 'update') {
    emit('update', thisValue.value, promises.value);
  }
});

const resetValue = () => thisValue.value.resetToSnapshot();

const onCreatePromise = (promise?: UpdateFormFieldPromise<T>) => {
  if (promise) {
    promises.value.push(promise);
  }
};

watch(
  () => props.value,
  (value) => thisValue.value.merge(value),
  { deep: true },
);
</script>
