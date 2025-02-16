import type { RouterContext } from '@/app/providers/router/types';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

export const authMiddleware = async ({ next }: RouterContext) => {
  if (!useAuthStore().isAuthorized) {
    return next({
      name: 'auth',
    });
  }

  return next();
};
