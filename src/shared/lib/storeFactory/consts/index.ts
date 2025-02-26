import type { BaseAPI } from '@/shared/lib/storeFactory';
import type { Model } from '@/shared/lib/storeFactory/model/Model';

export interface FetchState<T extends Model, A extends BaseAPI<T>> {
  $api: A;
  unwrapItems: T[];
  draft: T[];
  isLoading: boolean;
  error: null | unknown;
}

export const fetchState = <T extends Model, A extends BaseAPI<T>>(api: A): FetchState<T, A> => ({
  $api: api,
  unwrapItems: [],
  draft: [],
  isLoading: false,
  error: null,
});
