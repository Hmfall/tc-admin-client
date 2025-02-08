<template>
  <v-navigation-drawer color="background">
    <div
      class="text-center py-4"
      @click="updateModelValue(null)"
    >
      <router-link to="/">
        <span class="text-h6">Разделы</span>
      </router-link>
    </div>

    <v-tabs
      :model-value="tab"
      color="primary"
      direction="vertical"
      :mandatory="false"
      @update:model-value="updateModelValue"
    >
      <router-link
        v-for="item in sections"
        :key="item.title"
        class="d-none d-md-flex font-weight-medium"
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
  </v-navigation-drawer>
  <slot />
</template>

<script setup lang="ts">
import type { RouteSection } from '@/pages/home/types';

const props = defineProps<{
  modelValue: RouteSection | null;
  sections: RouteSection[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', sectionPath: RouteSection | null): void;
}>();

const tab = ref<string | null>(props.modelValue?.path ?? null);

const updateModelValue = (value?: unknown) => {
  if (typeof value === 'string') {
    tab.value = value;
    emit('update:modelValue', props.sections.find((item) => item.path === value) ?? null);
  } else {
    tab.value = null;
    emit('update:modelValue', null);
  }
};
</script>

<style scoped lang="scss">
:deep(.v-slide-group--vertical .v-tab__slider) {
  width: 3px;
}
</style>
