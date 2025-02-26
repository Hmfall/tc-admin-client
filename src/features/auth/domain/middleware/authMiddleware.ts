import type { RouterContext } from '@/app/providers/router/types';
import { useAuth } from '@/features/auth/model/useAuth';

export const authMiddleware = async ({ next }: RouterContext) => {
  if (!useAuth().isAuthorized.value) {
    return next({
      name: 'auth',
    });
  }

  return next();
};
