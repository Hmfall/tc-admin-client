<template>
  <PageLayout>
    <template #header>Редактирование раздела "{{ section.title }}"</template>

    <TemplateFormBuilder
      class="d-flex-column ga-10"
      :model="section.model"
      :store="section.store"
      :template-slots="section.templateSlots"
      :form-fields="section.formFields"
    />
  </PageLayout>
</template>

<script setup lang="ts" generic="T extends Model, A extends BaseAPI<T>">
import { mappedRouteSections, routeSections } from '@/pages/section/domain/builder';
import type { RouteSection } from '@/pages/section/types';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import PageLayout from '@/shared/ui/layouts/PageLayout.vue';
import TemplateFormBuilder from '@/widgets/templateFormBuilder/ui/TemplateFormBuilder.vue';

const router = useRouter();

const section = computed(
  () =>
    mappedRouteSections[(router.currentRoute.value.name as string) ?? routeSections[0].routeName],
) as ComputedRef<RouteSection<T, A>>;

watch(section, (value) => value.store.fetch(), {
  immediate: true,
});
</script>
