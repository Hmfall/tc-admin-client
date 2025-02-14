<template>
  <v-container fluid>
    <NavigationWrapper
      v-model:section="section"
      v-model:isDrawerExpanded="isDrawerExpanded"
      :sections="routeSections"
    >
      <SectionWrapper
        :section="section"
        @on-menu="isDrawerExpanded = true"
      />
    </NavigationWrapper>
  </v-container>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import type { Ref } from 'vue';
import { useDisplay } from 'vuetify';
import { routeSections } from '@/pages/home/domain/routeSections';
import type { RouteSection } from '@/pages/home/types';
import NavigationWrapper from '@/pages/home/ui/navigationWrapper/NavigationWrapper.vue';
import SectionWrapper from '@/pages/home/ui/sectionWrapper/SectionWrapper.vue';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import { Event } from '@/entities/event/model/Event';

const isDrawerExpanded = ref(useDisplay().lgAndUp.value ?? false);

const section = ref(
  routeSections.find((section) => section.path === useRouter().currentRoute.value.path) ??
    routeSections[0],
) as Ref<RouteSection<T, A>>;

console.log(new Event());
</script>
