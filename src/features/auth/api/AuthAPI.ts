import type {
  RecoveryRequest,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from '@/features/auth/model/types';
import { API, BaseAPI } from '@/shared/lib/storeFactory';

@API('auth')
export class AuthAPI extends BaseAPI {
  async signIn(data: SignInRequest) {
    return await this.api.post<SignInResponse>('/signin', data);
  }

  async signUp(data: SignUpRequest) {
    return await this.api.post('/signup', data);
  }

  async recovery(body: RecoveryRequest) {
    return await this.api.post('/recovery', body);
  }
}

export const authAPI = new AuthAPI();
