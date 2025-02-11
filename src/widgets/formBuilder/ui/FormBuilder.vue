<template>
  <VForm
    ref="form"
    @submit.prevent="onSubmit"
  >
    <FormBuilderWrapper :fields="fields">
      <template #fields="{ field }">
        <component
          :is="field.render()"
          v-model="value[field.key]"
          :item="value"
          v-bind="field.props"
          @update-field="(v: UpdateFormFieldValue<T>) => (value[v.key] = v.value)"
          @on-create-promise="onCreatePromise"
        />
      </template>
    </FormBuilderWrapper>

    <slot
      v-if="$slots.actions"
      name="actions"
      v-bind="{ onReset: resetValue }"
    />

    <ActionButtons
      v-else
      confirm-button="Сохранить"
      @on-cancel="emit('onClose')"
    />
  </VForm>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import type { Ref } from 'vue';
import type { ClassConstructor } from 'class-transformer';
import { VForm } from 'vuetify/components';
import type { BaseModel } from '@/shared/lib/storeFactory';
import ActionButtons from '@/shared/ui/actionButtons/ActionButtons.vue';
import type { FormEditMode, UpdateFormFieldValue } from '@/widgets/formBuilder/types/common';
import type { FormBuilderFields } from '@/widgets/formBuilder/types/formBuilder';
import FormBuilderWrapper from '@/widgets/formBuilder/ui/FormBuilderWrapper.vue';

const props = defineProps<{
  fields?: FormBuilderFields<T>;
  item: T | null;
  modelConstructor?: ClassConstructor<T>;
  mode?: FormEditMode;
}>();

const emit = defineEmits<{
  (e: 'update:item', value: T): void;
  (e: 'onCreate', item: T): void;
  (e: 'onUpdate', item: T): void;
  (e: 'onReset'): void;
  (e: 'onClose'): void;
}>();

const initial = () =>
  props.item?.clone() ?? (props?.modelConstructor && new props.modelConstructor());

const form = ref<VForm | null>(null);

const value = ref(initial()) as Ref<T>;
const snapshot = ref(initial()) as Ref<T>;

const promises = ref<FunctionExpression<Promise<void>>[]>([]);

const onSubmit = () => {
  if (!form.value) {
    return;
  }

  form.value.validate().then(() => {
    if (props.mode === 'create') {
      emit('onCreate', value.value);
    } else if (props.mode === 'update') {
      emit('onUpdate', value.value);
    }

    Promise.all(promises.value.map((promise) => promise()))
      .then(() => {
        console.log('resolved');
      })
      .catch(() => {
        console.error('Произошла ошибка загрузки файла! Повторите попытку.');
      })
      .finally(() => {
        promises.value = [];
      });
  });
};

const resetValue = () => value.value.merge(snapshot.value);

const onCreatePromise = (promise: FunctionExpression<Promise<void>>) => {
  promises.value.push(promise);
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
