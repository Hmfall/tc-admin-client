<template>
  <VForm
    ref="form"
    v-model="isFormValid"
    @submit.prevent="onSubmit"
  >
    <FormBuilderWrapper :fields="fields">
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
    </FormBuilderWrapper>

    <slot
      v-if="$slots.actions"
      name="actions"
      v-bind="{ reset: resetValue }"
    />

    <ActionButtons
      v-else
      confirm-button="Сохранить"
      :loading="loading"
      :disabled="!isFormValid"
      @cancel="emit('close')"
    />
  </VForm>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import type { Ref } from 'vue';
import type { ClassConstructor } from 'class-transformer';
import { VForm } from 'vuetify/components';
import type { BaseModel } from '@/shared/lib/storeFactory';
import ActionButtons from '@/shared/ui/actionButtons/ActionButtons.vue';
import type {
  FormBuilderFields,
  FormEditMode,
  UpdateFormFieldPromise,
} from '@/widgets/formBuilder/types';
import FormBuilderWrapper from '@/widgets/formBuilder/ui/FormBuilderWrapper.vue';

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

const form = ref<VForm | null>(null);

const isFormValid = ref(props.mode === 'update' ?? false);

const thisValue = ref(props.value?.clone() ?? (props?.model && new props.model())) as Ref<T>;

const promises = ref<UpdateFormFieldPromise<T>[]>([]);

const onSubmit = () => {
  if (!form.value) {
    return;
  }

  form.value.validate().then(({ valid }) => {
    if (valid && thisValue) {
      if (props.mode === 'create') {
        emit('create', thisValue.value, promises.value);
      } else if (props.mode === 'update') {
        emit('update', thisValue.value, promises.value);
      }
    }
  });
};

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
