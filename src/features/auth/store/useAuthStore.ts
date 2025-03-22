import type { JwtPayload } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import { authAPI } from '@/features/auth/api/AuthAPI';
import type { LSAuth, RecoveryRequest, SignInRequest } from '@/features/auth/model/types';
import { LSKeys } from '@/shared/constants/LSKeys';

interface State {
  accessToken: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    accessToken: null,
  }),
  actions: {
    async authorize(payload: SignInRequest) {
      const { token: accessToken } = await authAPI.signIn(payload);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const jwtPayload: JwtPayload = jwtDecode(accessToken);

      const LSAuthValue: LSAuth = {
        accessToken,
      };

      this.accessToken = accessToken;
      localStorage.setItem(LSKeys.Auth, JSON.stringify(LSAuthValue));
    },
    async recovery(request: RecoveryRequest) {
      return await authAPI.recovery(request);
    },
    logout() {
      this.accessToken = null;
      localStorage.removeItem(LSKeys.Auth);
    },
  },
  getters: {
    isAuthorized() {
      return !!localStorage.getItem(LSKeys.Auth);
    },
  },
});
