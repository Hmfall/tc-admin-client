import { createRouter, createWebHistory } from 'vue-router';
import { appConfig } from '@/app/config';
import { routerMiddleware } from '@/app/providers/router/middleware';
import { routes } from '@/app/providers/router/routes';

const router = createRouter({
  history: createWebHistory(appConfig.APP_BASE_URL),
  routes,
});

routerMiddleware(router);

export default router;
