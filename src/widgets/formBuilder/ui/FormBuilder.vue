<template>
  <VForm
    ref="formRef"
    v-model="isFormValid"
    @submit.prevent="onSubmit"
  >
    <FormBuilderWrapper :fields="fields">
      <template #fields="{ field }">
        <component
          :is="field.render()"
          v-model="value[field.key]"
          :item="value"
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
      :loading="loading"
      :disabled="!isFormValid"
      @on-cancel="emit('close')"
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
  fields?: FormBuilderFields<T>;
  item: T | null;
  model?: ClassConstructor<T>;
  mode?: FormEditMode;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:item', value: T): void;
  (e: 'create', item: T, promises: UpdateFormFieldPromise<T>[]): void;
  (e: 'update', item: T, promises: UpdateFormFieldPromise<T>[]): void;
  (e: 'update', item: T, promises: UpdateFormFieldPromise<T>[]): void;
  (e: 'close'): void;
}>();

const initial = () => props.item?.clone() ?? (props?.model && new props.model());

const formRef = ref<VForm | null>(null);

const isFormValid = ref(props.mode === 'update' ?? false);

const value = ref(initial()) as Ref<T>;

const snapshot = ref(initial()) as Ref<T>;

const promises = ref<UpdateFormFieldPromise<T>[]>([]);

const onSubmit = () => {
  if (!formRef.value) {
    return;
  }

  formRef.value.validate().then(({ valid }) => {
    if (valid) {
      if (props.mode === 'create') {
        emit('create', value.value, promises.value);
      } else if (props.mode === 'update') {
        emit('update', value.value, promises.value);
      }
    }
  });
};

const resetValue = () => value.value.merge(snapshot.value);

const onCreatePromise = (promise?: UpdateFormFieldPromise<T>) => {
  if (promise) {
    promises.value.push(promise);
  }
};

watch(
  () => props.item,
  (item) => {
    value.value.merge(item);
    snapshot.value.merge(item);
  },
  { deep: true },
);
</script>
