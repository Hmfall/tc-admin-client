import type { NavigationGuardNext, Router } from 'vue-router';
import type { RouterContext } from '@/app/providers/router/types';

export const routerMiddleware = (router: Router) => {
  router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
      return next();
    }

    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      to,
      from,
      next,
      router,
    };

    return middleware[0]({
      ...context,
      next: nextFactory(context, middleware, 1),
    });
  });
};

const nextFactory = (
  context: RouterContext,
  middleware: ((context: RouterContext) => NavigationGuardNext)[],
  i: number,
): NavigationGuardNext => {
  const nextMiddleware = middleware[i];

  if (!nextMiddleware) {
    return context.next;
  }

  const nextPipeline = nextFactory(context, middleware, i + 1);

  return nextMiddleware({ ...context, next: nextPipeline });
};
