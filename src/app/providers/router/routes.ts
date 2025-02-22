import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/app/layouts/MainLayout.vue';
import { aboutModuleConfig } from '@/modules/about/domain/config';
import { authMiddleware } from '@/modules/auth/domain/middleware/authMiddleware';
import { contactsModuleConfig } from '@/modules/contacts/domain/config';
import { eventsModuleConfig } from '@/modules/events/domain/config';
import { galleryModuleConfig } from '@/modules/gallery/domain/config';
import { partnersModuleConfig } from '@/modules/partners/domain/config';
import { socialModuleConfig } from '@/modules/socials/domain/config';

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
                component: async () => await import('@/modules/baseModule/ui/BaseModuleLayout.vue'),
            },
            {
                path: 'events',
                name: 'events',
                props: {
                    moduleConfig: eventsModuleConfig,
                },
                component: async () => await import('@/modules/baseModule/ui/BaseModuleLayout.vue'),
            },
            {
                path: 'gallery',
                name: 'gallery',
                props: {
                    moduleConfig: galleryModuleConfig,
                },
                component: async () => await import('@/modules/baseModule/ui/BaseModuleLayout.vue'),
            },
            {
                path: 'partners',
                name: 'partners',
                props: {
                    moduleConfig: partnersModuleConfig,
                },
                component: async () => await import('@/modules/baseModule/ui/BaseModuleLayout.vue'),
            },
            {
                path: 'social',
                name: 'social',
                props: {
                    moduleConfig: socialModuleConfig,
                },
                component: async () => await import('@/modules/baseModule/ui/BaseModuleLayout.vue'),
            },
            {
                path: 'contacts',
                name: 'contacts',
                props: {
                    moduleConfig: contactsModuleConfig,
                },
                component: async () => await import('@/modules/baseModule/ui/BaseModuleLayout.vue'),
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
        component: async () => await import('@/modules/accounts/ui/AccountsModule.vue'),
    },
];
