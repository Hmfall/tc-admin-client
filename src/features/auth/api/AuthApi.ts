import type { AuthPayload, AuthResponse } from '@/features/auth/model/types';
import { API, BaseAPI } from '@/shared/lib/storeFactory';

@API('auth')
export class AuthAPI extends BaseAPI<any> {
  async authorize(payload: AuthPayload): Promise<AuthResponse> {
    return await this.api.post('/', payload);
  }
}
