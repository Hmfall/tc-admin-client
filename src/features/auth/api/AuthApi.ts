import type { AuthPayload, AuthResponse } from '@/features/auth/types';
import { API, BaseAPI } from '@/shared/lib/storeFactory';

@API('auth')
export class AuthAPI extends BaseAPI {
  async authorize(payload: AuthPayload): Promise<AuthResponse> {
    return await this.api.post('/', payload);
  }
}
