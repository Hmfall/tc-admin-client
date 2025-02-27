import DefaultLayout from '@/app/layouts/DefaultLayout.vue';
import { AppRoutes } from '@/app/providers/router/appRoutes';
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
    name: AppRoutes.main,
    redirect: { name: AppRoutes.about },
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware],
    },
    children: [
      {
        path: 'about',
        name: AppRoutes.about,
        props: {
          moduleConfig: aboutModuleConfig,
        },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'events',
        name: AppRoutes.events,
        props: {
          moduleConfig: eventsModuleConfig,
        },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'gallery',
        name: AppRoutes.gallery,
        props: {
          moduleConfig: galleryModuleConfig,
        },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'partners',
        name: AppRoutes.partners,
        props: {
          moduleConfig: partnersModuleConfig,
        },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'social',
        name: AppRoutes.social,
        props: {
          moduleConfig: socialModuleConfig,
        },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'contacts',
        name: AppRoutes.contacts,
        props: {
          moduleConfig: contactsModuleConfig,
        },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
    ],
  },
  {
    path: '/auth',
    name: AppRoutes.auth,
    component: async () => await import('@/pages/auth/ui/AuthPage.vue'),
    children: [
      {
        path: 'password/reset',
        name: AppRoutes.resetPassword,
        component: async () => await import('@/pages/auth/ui/AuthPage.vue'),
      },
      {
        path: 'password/new',
        name: AppRoutes.newPassword,
        component: async () => await import('@/pages/auth/ui/AuthPage.vue'),
      },
    ],
  },
  {
    path: '/accounts',
    name: AppRoutes.accounts,
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware],
    },
    component: async () => await import('@/pages/accounts/ui/AccountsModule.vue'),
  },
];
