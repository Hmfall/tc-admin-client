import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    name: 'auth',
    path: '/auth',
    component: async () => await import('@/pages/auth/ui/AuthPage.vue'),
  },
  {
    name: 'home',
    path: '/',
    component: async () => await import('@/pages/home/ui/HomePage.vue'),
    children: [
      {
        path: 'events',
        name: 'events',
        component: async () => await import('@/pages/home/ui/sectionWrapper/SectionWrapper.vue'),
      },
      {
        path: 'about',
        name: 'about',
        component: async () => await import('@/pages/home/ui/sectionWrapper/SectionWrapper.vue'),
      },
      {
        path: 'gallery',
        name: 'gallery',
        component: async () => await import('@/pages/home/ui/sectionWrapper/SectionWrapper.vue'),
      },
      {
        path: 'partners',
        name: 'partners',
        component: async () => await import('@/pages/home/ui/sectionWrapper/SectionWrapper.vue'),
      },
      {
        path: 'social',
        name: 'social',
        component: async () => await import('@/pages/home/ui/sectionWrapper/SectionWrapper.vue'),
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: async () => await import('@/pages/home/ui/sectionWrapper/SectionWrapper.vue'),
      },
    ],
  },
];
