<template>
  <v-navigation-drawer
    :model-value="isDrawerExpanded"
    color="background"
    :mobile="$vuetify.display.mdAndDown"
    @update:model-value="$emit('update:isDrawerExpanded', $event)"
  >
    <div class="h-100 d-flex flex-column">
      <div class="text-center my-4">
        <span class="text-h6">Разделы</span>
      </div>

      <div class="d-flex flex-1-1 flex-column justify-space-between">
        <v-tabs
          :model-value="tab"
          class="flex-1-1"
          color="primary"
          direction="vertical"
          @update:model-value="updateModelValue"
        >
          <router-link
            v-for="item in sections"
            :key="item.title"
            :to="item.path"
          >
            <v-tab
              :key="item.path"
              class="w-100"
              :text="item.title"
              :value="item.path"
            />
          </router-link>
        </v-tabs>
      </div>

      <div class="d-flex flex-column align-center ga-5 mt-4 mb-6">
        <div class="text-center">
          <router-link
            to="/"
            class="text-decoration-underline"
          >
            Управлением аккаунтами
          </router-link>
        </div>

        <div>
          <v-btn>Выйти</v-btn>
        </div>
      </div>
    </div>
  </v-navigation-drawer>

  <slot />
</template>

<script setup lang="ts">
import type { CommonRouteSection } from '@/pages/home/types';

const props = defineProps<{
  section: CommonRouteSection;
  sections: CommonRouteSection[];
  isDrawerExpanded: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:section', section: CommonRouteSection): void;
  (e: 'update:isDrawerExpanded', value: boolean): void;
}>();

const tab = ref(props.section.path);

const updateModelValue = (value?: unknown) => {
  if (typeof value === 'string') {
    tab.value = value;
    emit('update:section', props.sections.find((item) => item.path === value)!);
  }
};
</script>

<style scoped lang="scss">
:deep(.v-slide-group--vertical .v-tab__slider) {
  width: 3px;
}
</style>
