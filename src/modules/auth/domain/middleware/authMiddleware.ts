import type { RouterContext } from '@/app/providers/router/types';
import { useAuth } from '@/modules/auth/model/useAuth';

export const authMiddleware = async ({ next }: RouterContext) => {
  if (!useAuth().isAuthorized) {
    return next({
      name: 'auth',
    });
  }

  return next();
};
