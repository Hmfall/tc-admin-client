<template>
  <v-navigation-drawer
    :model-value="expanded"
    color="background"
    border="0"
    :mobile="$vuetify.display.lgAndDown"
    @update:model-value="$emit('update:expanded', $event)"
  >
    <div class="h-100 d-flex flex-column">
      <div class="text-center my-4">
        <span class="text-h6">Разделы</span>
      </div>

      <div class="d-flex flex-1-1 flex-column justify-space-between">
        <v-tabs
          :model-value="currentTab"
          class="flex-1-1"
          color="primary"
          direction="vertical"
          mandatory
          @update:model-value="null"
        >
          <router-link
            v-for="item in navItems"
            :key="item.name"
            v-slot="{ navigate }"
            custom
            :to="{ name: item.routeName }"
          >
            <v-tab
              :key="item.routeName"
              class="w-100"
              :text="item.name"
              :value="item.routeName"
              @click="navigate"
            />
          </router-link>
        </v-tabs>
      </div>

      <div class="d-flex flex-column align-center ga-5 mt-4 mb-6">
        <div class="d-flex flex-column ga-4">
          <div class="text-center">
            <router-link
              :to="{ name: AppRoutes.Accounts }"
              class="text-decoration-underline"
              active-class="active-link"
            >
              Управлением аккаунтами
            </router-link>
          </div>

          <div class="text-center">
            <router-link
              :to="{ name: AppRoutes.InProgress }"
              class="text-decoration-underline"
              active-class="active-link"
            >
              В разработке
            </router-link>
          </div>
        </div>

        <v-btn @click="logout">Выйти</v-btn>
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

const currentTab = ref(route.name);

const logout = async () => {
  await router.replace({ name: AppRoutes.Auth });
  authStore.logout();
};

const mappedNavItems = props.navItems.reduce<Record<string, NavItem>>((acc, curr) => {
  acc[curr.routeName] = { ...curr };
  return acc;
}, {});

watch(route, (value) => {
  if (mappedNavItems[String(value.name)]) {
    currentTab.value = value.name;
  } else {
    currentTab.value = null;
  }
});
</script>

<style scoped lang="scss">
@import '@/shared/assets/styles/mixins';

:deep(.v-slide-group--vertical .v-tab__slider) {
  width: 3px;
}

.active-link {
  @include link;
}
</style>
