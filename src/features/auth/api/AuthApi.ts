import type { AuthPayload, AuthResponse } from '@/features/auth/model/types';
import { API, BaseAPI } from '@/shared/lib/storeFactory';

@API('auth')
export class AuthAPI extends BaseAPI {
  async authorize(payload: AuthPayload) {
    return await this.api.post<AuthResponse>('/', payload);
  }
}
