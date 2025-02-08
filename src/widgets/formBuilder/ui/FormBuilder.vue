<template>
  <VForm
    ref="form"
    @submit.prevent
  >
    <v-container>
      <template v-if="normalizedGrid">
        <v-row
          v-for="(row, rowIndex) in normalizedGrid"
          :key="rowIndex"
          :justify="row?.justify"
        >
          <v-col
            v-for="(col, colIndex) in row?.cols"
            :key="colIndex"
            :cols="col.span"
          >
            <v-row>
              <v-col
                v-for="field in col.items"
                :key="field.key"
                cols="12"
              >
                <component
                  :is="field.render()"
                  v-model="value[field.key]"
                  :item="value"
                  v-bind="field.props"
                  @update-field="(v: UpdateFormFieldValue<T>) => (value[v.key] = v.value)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </template>

      <v-row v-else>
        <v-col
          v-for="field in flatFields"
          :key="field.key"
          cols="12"
        >
          <component
            :is="field.render()"
            v-model="value[field.key]"
            :item="value"
            v-bind="componentProps(field)"
            @update-field="(v: UpdateFormFieldValue<T>) => (value[v.key] = v.value)"
          />
        </v-col>
      </v-row>

      <slot
        name="actions"
        v-bind="{ onSubmit, onReset }"
      />
    </v-container>
  </VForm>
</template>

<script setup lang="ts" , generic="T extends BaseModel">
import type { Ref } from 'vue';
import type { ClassConstructor } from 'class-transformer';
import { VForm } from 'vuetify/components';
import type { BaseModel } from '@/shared/lib/storeFactory';
import type { FormEditMode, UpdateFormFieldValue } from '@/widgets/formBuilder/types/common';
import type {
  FormBuilderColArgs,
  FormBuilderColOptions,
  FormBuilderFields,
  FormBuilderField,
} from '@/widgets/formBuilder/types/formBuilder';

const props = defineProps<{
  fields?: FormBuilderFields<T>;
  item: T | null;
  modelConstructor?: ClassConstructor<T>;
  mode?: FormEditMode;
}>();

const emit = defineEmits<{
  (e: 'update:item', value: T): void;
  (e: 'onSumbit', item: T): void;
  (e: 'onCreate', item: T): void;
  (e: 'onUpdate', item: T): void;
  (e: 'onReset'): void;
}>();

const initial = () =>
  props.item?.clone() ?? (props?.modelConstructor && new props.modelConstructor());

const form = ref<VForm | null>();

const snapshot = ref(initial()) as Ref<T>;

const value = ref(initial()) as Ref<T>;

const normalizedGrid = computed(() =>
  Array.isArray(props.fields?.[0])
    ? props.fields?.map((row) =>
        Array.isArray(row)
          ? {
              justify:
                (row.find((col) => 'justify' in col) as FormBuilderColOptions)?.justify ?? 'start',
              cols: row.filter((col): col is FormBuilderColArgs<T> => 'span' in col),
            }
          : null,
      )
    : null,
);

const flatFields = computed(() => {
  const isFlatFields = (fields?: FormBuilderFields<T>): fields is FormBuilderField<T>[] =>
    Array.isArray(fields) && !Array.isArray(fields?.[0]);

  return isFlatFields(props?.fields) ? props.fields : [];
});

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

    emit('onSumbit', value.value);
  });
};

const onReset = () => {
  value.value.merge(snapshot.value);
};

const componentProps = (field: FormBuilderField<T>) => {
  if (field) {
    const { render, type, ...props } = field;
    return props;
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

defineExpose({ onSubmit });
</script>
