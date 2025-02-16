import type { BaseAPI } from '@/shared/lib/storeFactory/model/BaseAPI';
import type { Model } from '@/shared/lib/storeFactory/model/Model';

export interface FetchState<T extends Model, A extends BaseAPI<T>> {
  $api: A;
  unwrapItems: T[];
  isLoading: boolean;
  error: null | unknown;
}

export const fetchState = <T extends Model, A extends BaseAPI<T>>(api: A): FetchState<T, A> => ({
  $api: api,
  unwrapItems: [],
  isLoading: false,
  error: null,
});
