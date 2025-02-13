<template>
  <template v-if="section">
    <v-card>
      <v-card-title class="text-center">Редактирование раздела "{{ section.title }}"</v-card-title>

      <v-card-item class="px-6">
        <TemplateFormBuilder
          :store="section.store"
          :model-constructor="section.model"
          :form-builder="section.formBuilder"
          :template-builder="section.templateBuilder"
        />
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
