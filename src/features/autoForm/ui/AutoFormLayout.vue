<template>
  <v-container fluid>
    <template v-if="normalizedGrid">
      <v-row
        v-for="(row, rowIndex) in normalizedGrid"
        :key="rowIndex"
        :justify="row?.justify"
      >
        <v-col
          v-for="(col, colIndex) in row?.cols"
          :key="colIndex"
          v-bind="isAutoFormColSpan(col.span) ? transformAutoFormColSpan(col.span) : {}"
          :cols="isAutoFormColSpan(col.span) ? col.span?.xs ?? 12 : col.span"
        >
          <v-row>
            <v-col
              v-for="field in col.items"
              :key="field.key"
              v-bind="isAutoFormColSpan(field.span) ? transformAutoFormColSpan(field.span) : {}"
              :cols="isAutoFormColSpan(field.span) ? field.span?.xs ?? 12 : field?.span ?? 12"
              :order="field?.order?.xs"
              :order-sm="field?.order?.sm"
              :order-md="field?.order?.md"
              :order-lg="field?.order?.lg"
              :order-xl="field?.order?.xl"
            >
              <slot
                name="fields"
                v-bind="{ field }"
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
        class="flat"
        cols="12"
      >
        <slot
          name="fields"
          v-bind="{ field }"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import { useMemoize } from '@vueuse/core';
import type {
  AutoFormColBreakpoint,
  AutoFormColCommonOptions,
  AutoFormColOptions,
  AutoFormField,
  AutoFormFields,
} from '@/features/autoForm/model/types';
import type { BaseModel } from '@/shared/lib/storeFactory';

const props = defineProps<{
  fields?: AutoFormFields<T>;
}>();

const normalizedGrid = computed(() =>
  Array.isArray(props.fields?.[0])
    ? props.fields?.map((row) =>
        Array.isArray(row)
          ? {
              justify:
                (row.find((col) => 'justify' in col) as AutoFormColCommonOptions)?.justify ??
                'start',
              cols: row.filter((col): col is AutoFormColOptions<T> => 'span' in col),
            }
          : null,
      )
    : null,
);

const isAutoFormColSpan = (span?: number | AutoFormColBreakpoint): span is AutoFormColBreakpoint =>
  typeof span === 'object';

const transformAutoFormColSpan = useMemoize(
  (span: AutoFormColBreakpoint): Omit<AutoFormColBreakpoint, 'xs'> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { xs, ...value } = span;
    return value;
  },
);

const flatFields = computed(() => {
  const isFlatFields = (fields?: AutoFormFields<T>): fields is AutoFormField<T>[] =>
    Array.isArray(fields) && !Array.isArray(fields?.[0]);

  return isFlatFields(props?.fields) ? props.fields : [];
});
</script>

<style scoped lang="scss">
.flat {
  :deep(.v-input:not(.editor-hidden-input)) {
    position: relative;

    .v-input__details {
      position: absolute;
      width: 100%;
    }
  }
}
</style>
