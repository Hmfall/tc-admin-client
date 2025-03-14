<template>
  <v-navigation-drawer
    :model-value="expanded"
    color="background"
    :mobile="$vuetify.display.mdAndDown"
    @update:model-value="$emit('update:expanded', $event)"
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
            v-for="item in navItems"
            :key="item.name"
            :to="{ name: item.routeName }"
          >
            <v-tab
              :key="item.routeName"
              class="w-100"
              :text="item.name"
              :value="item.routeName"
            />
          </router-link>
        </v-tabs>
      </div>

      <div class="d-flex flex-column align-center ga-5 mt-4 mb-6">
        <div class="text-center">
          <router-link
            :to="{ name: AppRoutes.accounts }"
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
import { AppRoutes } from '@/app/providers/router/appRoutes';
import type { NavItem } from '@/features/appMenu/model/types';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

const props = defineProps<{
  expanded: boolean;
  navItems: NavItem[];
}>();

defineEmits<{
  (e: 'update:expanded', value: boolean): void;
}>();

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const tab = ref(router.currentRoute.value.name);

const mappedNavItems = props.navItems.reduce<Record<string, NavItem>>((acc, curr) => {
  acc[curr.routeName] = { ...curr };
  return acc;
}, {});

watch(route, (value) => {
  if (!mappedNavItems[String(value.name)]) {
    tab.value = null;
  }
});
</script>

<style scoped lang="scss">
:deep(.v-slide-group--vertical .v-tab__slider) {
  width: 3px;
}
</style>
