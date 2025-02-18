<template>
  <v-navigation-drawer
    :model-value="modelValue"
    color="background"
    :mobile="$vuetify.display.mdAndDown"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="h-100 d-flex flex-column">
      <div class="text-center my-4">
        <span class="text-h6">Разделы</span>
      </div>

      <div class="d-flex flex-1-1 flex-column justify-space-between">
        <v-tabs
          v-model="tab"
          class="flex-1-1"
          color="primary"
          direction="vertical"
          mandatory
        >
          <router-link
            v-for="item in routeSections"
            :key="item.title"
            :to="{ name: item.routeName }"
          >
            <v-tab
              :key="item.routeName"
              class="w-100"
              :text="item.title"
              :value="item.routeName"
            />
          </router-link>
        </v-tabs>
      </div>

      <div class="d-flex flex-column align-center ga-5 mt-4 mb-6">
        <div class="text-center">
          <router-link
            :to="{ name: 'accounts' }"
            class="text-decoration-underline"
            active-class="color-primary"
          >
            Управлением аккаунтами
          </router-link>
        </div>

        <div>
          <v-btn @click="authStore.logout">Выйти</v-btn>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { mappedRouteSections, routeSections } from '@/pages/section/domain/builder';

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
}>();

const router = useRouter();

const authStore = useAuthStore();

const tab = ref(router.currentRoute.value.name);

watch(
  () => router.currentRoute.value.name,
  (value) => {
    if (value && !mappedRouteSections?.[value as string]) {
      tab.value = null;
    }
  },
);
</script>

<style scoped lang="scss">
:deep(.v-slide-group--vertical .v-tab__slider) {
  width: 3px;
}
</style>
