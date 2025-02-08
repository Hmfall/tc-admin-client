<template>
  <v-container fluid>
    <NavigationWrapper
      v-model="currentSection"
      :sections="routeSections"
    >
      <SectionWrapper :section="currentSection" />
    </NavigationWrapper>
  </v-container>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import type { Ref } from 'vue';
import { routeSections } from '@/pages/home/domain/routeSections';
import type { TypedRouteSection } from '@/pages/home/types';
import NavigationWrapper from '@/pages/home/ui/navigationWrapper/NavigationWrapper.vue';
import SectionWrapper from '@/pages/home/ui/sectionWrapper/SectionWrapper.vue';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';

const router = useRouter();

const currentSection = ref(
  routeSections.find((item) => item.path === router.currentRoute.value.path) ?? null,
) as Ref<TypedRouteSection<T, A> | null>;
</script>
