import { jwtDecode } from 'jwt-decode';
import router from '@/app/providers/router';
import { AuthAPI } from '@/features/auth/api/AuthApi';
import type { AuthPayload, JWTPayload } from '@/features/auth/types';

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
    async logout() {
      this.jwt = null;
      localStorage.removeItem('jwt');
      await router.replace({ name: 'auth' });
    },
  },
  getters: {
    $api: (): AuthAPI => new AuthAPI(),
    isAuthorized: () => !!localStorage.getItem('jwt'),
  },
});
