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
import { aboutModuleConfig } from '@/modules/about/domain/config';
import { contactsModuleConfig } from '@/modules/contacts/domain/config';
import { eventsModuleConfig } from '@/modules/events/domain/config';
import { galleryModuleConfig } from '@/modules/gallery/domain/config';
import { partnersModuleConfig } from '@/modules/partners/domain/config';
import { socialModuleConfig } from '@/modules/socials/domain/config';
import type { NavItem } from '@/widgets/appMenu/model/types';
import AppMenu from '@/widgets/appMenu/ui/AppMenu.vue';

const isDrawerExpanded = ref(useDisplay().lgAndUp.value ?? false);

provide('drawerExpanded', {
  updateDrawerExpanded: (value: boolean) => {
    isDrawerExpanded.value = value;
  },
});

const navItems: NavItem[] = [
  aboutModuleConfig,
  eventsModuleConfig,
  galleryModuleConfig,
  partnersModuleConfig,
  socialModuleConfig,
  contactsModuleConfig,
];
</script>
