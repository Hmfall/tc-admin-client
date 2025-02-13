<template>
  <div class="d-flex flex-column ga-8 mt-8">
    <div class="d-flex ga-4 justify-end">
      <v-btn>Удалить все</v-btn>

      <v-btn
        variant="flat"
        color="primary"
        @click="onAddBtn"
      >
        Добавить
      </v-btn>
    </div>

    <div class="d-flex flex-column ga-10">
      <TemplateBuilder
        v-for="(item, i) in store.items"
        :key="(item[item.primaryKey] as PropertyKey) ?? i"
        :item="item"
        :builder="templateBuilder"
        @on-edit-item="onEditBtn"
      />
    </div>

    <div class="d-flex justify-end">
      <v-btn
        variant="flat"
        color="primary"
        :loading="isLoading"
        @click="onSave"
      >
        Сохранить
      </v-btn>
    </div>

    <FormBuilderDialog
      v-model="isModal"
      :item="updatedItem"
      :fields="formBuilder"
      :mode="mode"
      :model-constructor="modelConstructor"
      @create="onCreateItem"
      @update="onUpdateItem"
      @close="onClose"
    />
  </div>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import type { Ref } from 'vue';
import type { ClassConstructor } from 'class-transformer';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import type { ModelStore } from '@/shared/lib/storeFactory/types';
import { useFetch } from '@/shared/lib/useFetch/useFetch';
import type { FormEditMode, UpdateFormFieldPromise } from '@/widgets/formBuilder/types/common';
import type { FormBuilderFields } from '@/widgets/formBuilder/types/formBuilder';
import FormBuilderDialog from '@/widgets/formBuilder/ui/FormBuilderDialog.vue';
import type { CommonTemplateBuilder } from '@/widgets/templateBuilder/types';
import TemplateBuilder from '@/widgets/templateBuilder/ui/TemplateBuilder.vue';

const props = defineProps<{
  store: ModelStore<T, A>;
  modelConstructor: ClassConstructor<T>;
  formBuilder: FormBuilderFields<T>;
  templateBuilder: CommonTemplateBuilder<T>;
}>();

const isModal = ref(false);

const isLoading = ref(false);

const mode = ref<FormEditMode>();

const updatedItem = ref<T | null>(new props.modelConstructor()) as Ref<T | null>;

const draft = ref(new Map()) as Ref<Map<T, UpdateFormFieldPromise<T>[]>>;

const onAddBtn = () => {
  isModal.value = true;
  mode.value = 'create';
};

const onEditBtn = (item: T) => {
  isModal.value = true;
  mode.value = 'update';
  updatedItem.value = item;
};

const onCreateItem = (item: T) => {};

const onUpdateItem = async (item: T, promises: UpdateFormFieldPromise<T>[]) => {
  console.log(item, item.toJSON());

  if (updatedItem.value) {
    updatedItem.value.merge(item);
    draft.value.set(updatedItem.value, promises);
  }
};

const onSave = () => {
  useFetch(
    () =>
      Promise.all(
        Array.from(draft.value.entries()).flatMap(([item, promises]) =>
          promises.map((promise) =>
            promise().then((response) => {
              item[response.key] = response.value;
            }),
          ),
        ),
      ).then(() => {
        Array.from(draft.value.keys()).forEach((item) => {
          console.log(item.toJSON());
        });
      }),
    { isLoading },
  );
};

const onClose = () => {
  updatedItem.value = null;
};
</script>
