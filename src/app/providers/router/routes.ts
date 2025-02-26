import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/app/layouts/MainLayout.vue';
import { aboutModuleConfig } from '@/pages/about/domain/config';
import { contactsModuleConfig } from '@/pages/contacts/domain/config';
import { eventsModuleConfig } from '@/pages/events/domain/config';
import { galleryModuleConfig } from '@/pages/gallery/domain/config';
import { partnersModuleConfig } from '@/pages/partners/domain/config';
import { socialModuleConfig } from '@/pages/socials/domain/config';
import { authMiddleware } from '@/features/auth/domain/middleware/authMiddleware';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'about' },
    meta: {
      layout: MainLayout,
      middleware: [authMiddleware],
    },
    children: [
      {
        path: 'about',
        name: 'about',
        props: {
          moduleConfig: aboutModuleConfig,
        },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'events',
        name: 'events',
        props: {
          moduleConfig: eventsModuleConfig,
        },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'gallery',
        name: 'gallery',
        props: {
          moduleConfig: galleryModuleConfig,
        },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'partners',
        name: 'partners',
        props: {
          moduleConfig: partnersModuleConfig,
        },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'social',
        name: 'social',
        props: {
          moduleConfig: socialModuleConfig,
        },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'contacts',
        name: 'contacts',
        props: {
          moduleConfig: contactsModuleConfig,
        },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    component: async () => await import('@/pages/auth/ui/AuthPage.vue'),
  },
  {
    path: '/accounts',
    name: 'accounts',
    meta: {
      layout: MainLayout,
      middleware: [authMiddleware],
    },
    component: async () => await import('@/pages/accounts/ui/AccountsModule.vue'),
  },
];
