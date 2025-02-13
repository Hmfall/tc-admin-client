<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <v-btn
        v-if="$vuetify.display.mdAndDown"
        variant="text"
        icon="$mdiMenu"
        @click="emit('onMenu')"
      />

      <div class="w-100 text-center">
        <span>Редактирование раздела "{{ section.title }}"</span>
      </div>
    </v-card-title>

    <v-card-text>
      <TemplateFormBuilder
        :store="section.store"
        :model-constructor="section.model"
        :form-builder="section.formBuilder"
        :template-builder="section.templateBuilder"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import type { RouteSection } from '@/pages/home/types';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import TemplateFormBuilder from '@/widgets/templateBuilder/ui/TemplateFormBuilder.vue';

const props = defineProps<{
  section: RouteSection<T, A>;
}>();

const emit = defineEmits<{
  (e: 'onMenu'): void;
}>();

watch(
  () => props.section.path,
  () => props.section.store.fetch(),
  {
    immediate: true,
  },
);
</script>
