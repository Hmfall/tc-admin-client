import DefaultLayout from '@/app/layouts/DefaultLayout.vue';
import { AppRoutes } from '@/app/providers/router/appRoutes';
import { aboutModuleConfig } from '@/pages/about/domain/config';
import { contactsModuleConfig } from '@/pages/contacts/domain/config';
import { eventsModuleConfig } from '@/pages/events/domain/config';
import { galleryModuleConfig } from '@/pages/gallery/domain/config';
import { inProgressModuleConfig } from '@/pages/inProgress/domain/config';
import { partnersModuleConfig } from '@/pages/partners/domain/config';
import { socialsModuleConfig } from '@/pages/socials/domain/config';
import { authMiddleware } from '@/features/auth/domain/middleware/authMiddleware';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: AppRoutes.Home,
    redirect: { name: AppRoutes.About },
    meta: {
      layout: DefaultLayout,
      middleware: [authMiddleware],
    },
    children: [
      {
        path: 'about',
        name: AppRoutes.About,
        props: { moduleConfig: aboutModuleConfig },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'events',
        name: AppRoutes.Events,
        props: { moduleConfig: eventsModuleConfig },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'gallery',
        name: AppRoutes.Gallery,
        props: { moduleConfig: galleryModuleConfig },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'partners',
        name: AppRoutes.Partners,
        props: { moduleConfig: partnersModuleConfig },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'social',
        name: AppRoutes.Social,
        props: { moduleConfig: socialsModuleConfig },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'contacts',
        name: AppRoutes.Contacts,
        props: { moduleConfig: contactsModuleConfig },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
      {
        path: 'accounts',
        name: AppRoutes.Accounts,
        component: async () => await import('@/pages/accounts/ui/AccountsModule.vue'),
      },
      {
        path: 'in-progress',
        name: AppRoutes.InProgress,
        props: { moduleConfig: inProgressModuleConfig },
        component: async () => await import('@/features/baseModule/ui/BaseModuleLayout.vue'),
      },
    ],
  },
  {
    path: '/auth',
    name: AppRoutes.Auth,
    component: async () => await import('@/pages/auth/ui/AuthPage.vue'),
    redirect: { name: AppRoutes.SignIn },
    children: [
      {
        path: '',
        name: AppRoutes.SignIn,
        component: async () => await import('@/features/auth/ui/LoginForm.vue'),
      },
      {
        path: 'password/new',
        name: AppRoutes.ResetPassword,
        component: async () => await import('@/features/auth/ui/RecoveryForm.vue'),
      },
    ],
  },
];
