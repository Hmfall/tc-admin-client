import { createRouter, createWebHistory } from 'vue-router';
import { routerMiddleware } from '@/app/providers/router/middleware';
import { routes } from '@/app/providers/router/routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

routerMiddleware(router);

export default router;
