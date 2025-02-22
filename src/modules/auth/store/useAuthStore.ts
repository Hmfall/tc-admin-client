import { jwtDecode } from 'jwt-decode';
import router from '@/app/providers/router';
import { defineStoreAdapter } from '@/app/providers/store/utils';
import { AuthAPI } from '@/modules/auth/api/AuthApi';
import type { AuthPayload, JWTPayload } from '@/modules/auth/model/types';

interface State {
  jwt: string | null;
}

const useAuthStore = defineStore('auth', {
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
    logout() {
      this.jwt = null;
      localStorage.removeItem('jwt');
      router.replace({ name: 'auth' });
    },
  },
  getters: {
    $api: (): AuthAPI => new AuthAPI(),
    isAuthorized: () => !!localStorage.getItem('jwt'),
  },
});

export const authStore = defineStoreAdapter(useAuthStore);
