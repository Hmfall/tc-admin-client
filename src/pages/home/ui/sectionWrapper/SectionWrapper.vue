<template>
  <template v-if="section">
    <v-card>
      <v-card-title class="text-center">Редактирование раздела "{{ section.title }}"</v-card-title>

      <v-card-item class="px-6">
        <div class="d-flex flex-column ga-8 mt-8">
          <div
            v-if="!props.section?.singleton"
            class="d-flex ga-4 justify-end"
          >
            <v-btn>Удалить все</v-btn>

            <v-btn
              variant="flat"
              color="primary"
              @click="isModal = true"
            >
              Добавить
            </v-btn>
          </div>

          <TemplateFormBuilder
            v-model:is-modal="isModal"
            :items="section.store?.items"
            :template-builder="section.templateBuilder"
            :form-builder="section.formBuilder"
            :model-constructor="section.model"
          />

          <div class="d-flex ga-4 justify-end">
            <v-btn
              variant="flat"
              color="primary"
            >
              Сохранить
            </v-btn>
          </div>
        </div>
      </v-card-item>
    </v-card>
  </template>

  <template v-else>
    <div class="h-100 d-flex align-center justify-center">
      <div class="text-center">
        Панель редактирования
        <br />
        раздела
      </div>
    </div>
  </template>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import type { TypedRouteSection } from '@/pages/home/types';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import TemplateFormBuilder from '@/widgets/templateBuilder/ui/TemplateFormBuilder.vue';

const props = defineProps<{
  section: TypedRouteSection<T, A> | null;
}>();

const isModal = ref(false);

watch(
  () => props.section?.path,
  () => {
    if (props.section) {
      props.section.store.fetch();
    }
  },
  {
    immediate: true,
  },
);
</script>
