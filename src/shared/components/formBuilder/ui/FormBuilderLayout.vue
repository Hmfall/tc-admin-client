<template>
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
                            <slot
                                name="fields"
                                :field="field"
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
                <slot
                    name="fields"
                    :field="field"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts" generic="T extends BaseModel">
import type {
    FormBuilderColArgs,
    FormBuilderColOptions,
    FormBuilderField,
    FormBuilderFields,
} from '@/shared/components/formBuilder/model/types';
import type { BaseModel } from '@/shared/lib/storeFactory';

const props = defineProps<{
    fields?: FormBuilderFields<T>;
}>();

const normalizedGrid = computed(() =>
    Array.isArray(props.fields?.[0])
        ? props.fields?.map((row) =>
              Array.isArray(row)
                  ? {
                        justify:
                            (row.find((col) => 'justify' in col) as FormBuilderColOptions)
                                ?.justify ?? 'start',
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
</script>
