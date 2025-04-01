import type { JwtPayload } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import { AppRoutes } from '@/app/providers/router/appRoutes';
import type {
  LSAuth,
  RecoveryRequest,
  SignInRequest,
  SignInResponse,
} from '@/features/auth/model/types';
import axios from '@/shared/api/axios';
import { LSKeys } from '@/shared/constants/LSKeys';

interface State {
  accessToken: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    accessToken: null,
  }),
  actions: {
    async authorize(signInRequest: SignInRequest) {
      const response = await axios.post<SignInResponse>('auth/signin', signInRequest);

      const LSAuthValue: LSAuth = {
        accessToken: response.data.token,
      };

      this.accessToken = response.data.token;
      localStorage.setItem(LSKeys.Auth, JSON.stringify(LSAuthValue));
    },
    async recovery(recoveryRequest: RecoveryRequest) {
      return await axios.post('auth/recovery', recoveryRequest);
    },
    async logout(options: { replace?: boolean } = { replace: true }) {
      this.$reset();
      localStorage.removeItem(LSKeys.Auth);

      if (options?.replace) {
        await this.router.replace({ name: AppRoutes.Auth });
      }
    },
  },
  getters: {
    isAuthorized() {
      return !!localStorage.getItem(LSKeys.Auth);
    },
    jwtPayload(state): Required<Pick<JwtPayload, 'sub' | 'iat' | 'exp'>> | null {
      return state.accessToken ? jwtDecode(state.accessToken) : null;
    },
    isAccessTokenExpired(): boolean {
      return this.jwtPayload ? this.jwtPayload.exp * 1e3 < Date.now() : false;
    },
  },
});
