import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/app/layouts/MainLayout.vue';
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
        component: async () => await import('@/pages/section/ui/SectionPage.vue'),
      },
      {
        path: 'events',
        name: 'events',
        component: async () => await import('@/pages/section/ui/SectionPage.vue'),
      },
      {
        path: 'gallery',
        name: 'gallery',
        component: async () => await import('@/pages/section/ui/SectionPage.vue'),
      },
      {
        path: 'partners',
        name: 'partners',
        component: async () => await import('@/pages/section/ui/SectionPage.vue'),
      },
      {
        path: 'social',
        name: 'social',
        component: async () => await import('@/pages/section/ui/SectionPage.vue'),
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: async () => await import('@/pages/section/ui/SectionPage.vue'),
      },
    ],
  },
  {
    name: 'auth',
    path: '/auth',
    component: async () => await import('@/pages/auth/ui/AuthPage.vue'),
  },
  {
    name: 'accounts',
    path: '/accounts',
    meta: {
      layout: MainLayout,
      middleware: [authMiddleware],
    },
    component: async () => await import('@/pages/accounts/ui/AccountsPage.vue'),
  },
];
