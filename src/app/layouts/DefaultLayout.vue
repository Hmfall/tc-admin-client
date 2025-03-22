<template>
  <AppMenu
    v-model:expanded="isDrawerExpanded"
    :nav-items="navItems"
  />

  <v-main>
    <router-view />
  </v-main>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { injectKeyModuleLayoutContext } from '@/app/layouts/moduleLayout/model/context';
import { aboutModuleConfig } from '@/pages/about/domain/config';
import { contactsModuleConfig } from '@/pages/contacts/domain/config';
import { eventsModuleConfig } from '@/pages/events/domain/config';
import { galleryModuleConfig } from '@/pages/gallery/domain/config';
import { partnersModuleConfig } from '@/pages/partners/domain/config';
import { socialsModuleConfig } from '@/pages/socials/domain/config';
import type { NavItem } from '@/features/appMenu/model/types';
import AppMenu from '@/features/appMenu/ui/AppMenu.vue';

const isDrawerExpanded = ref(useDisplay().lgAndUp.value ?? false);

provide(injectKeyModuleLayoutContext, {
  updateDrawerExpanded: (value: boolean) => {
    isDrawerExpanded.value = value;
  },
});

const navItems: NavItem[] = [
  aboutModuleConfig,
  eventsModuleConfig,
  galleryModuleConfig,
  partnersModuleConfig,
  socialsModuleConfig,
  contactsModuleConfig,
];
</script>
