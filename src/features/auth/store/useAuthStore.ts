import { jwtDecode } from 'jwt-decode';
import router from '@/app/providers/router';
import { AppRoutes } from '@/app/providers/router/appRoutes';
import { AuthAPI } from '@/features/auth/api/AuthAPI';
import type { AuthPayload, JWTPayload, ResetPasswordPayload } from '@/features/auth/model/types';

interface State {
  jwt: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    jwt: null,
  }),
  actions: {
    async authorize(payload: AuthPayload) {
      const { jwt } = await this.$api.authorize(payload);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const jwtPayload: JWTPayload = jwtDecode(jwt);

      this.jwt = jwtDecode(jwt);

      localStorage.setItem('jwt', JSON.stringify(jwt));
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async resetPassword(payload: ResetPasswordPayload) {},
    logout() {
      this.jwt = null;
      localStorage.removeItem('jwt');
      router.replace({ name: AppRoutes.Auth });
    },
  },
  getters: {
    $api: (): AuthAPI => new AuthAPI(),
    isAuthorized: () => !!localStorage.getItem('jwt'),
  },
});
