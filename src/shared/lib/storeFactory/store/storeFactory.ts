import type { GenericAbortSignal } from 'axios';
import type { ModelConstructor } from 'src/shared/lib/storeFactory/model/types';
import { useBaseRawFetch } from '@/shared/composables/useFetch/useBaseRawFetch';
import type { BaseAPI } from '@/shared/lib/storeFactory';
import type { FetchState } from '@/shared/lib/storeFactory/consts';
import { fetchState } from '@/shared/lib/storeFactory/consts';
import type { Model } from '@/shared/lib/storeFactory/model/Model';

export const storeFactory = <T extends Model, A extends BaseAPI<T>>(model: ModelConstructor<T>) =>
  defineStore(model.$api.path, {
    state: (): FetchState<T, A> => ({
      ...fetchState(model.$api as A),
    }),
    actions: {
      async load(options?: { signal?: GenericAbortSignal }): Promise<void> {
        await useBaseRawFetch({
          handler: () => this.$api.load(options),
          setData: this.setItems,
          setIsLoading: this.setIsLoading,
          setError: this.setError,
        }).execute();
      },
      setItems(value: T[] | T) {
        if (this.config.singleton) {
          if (value) {
            this.unwrapItems = [value] as UnwrapRefSimple<T[]>;
          }
        } else {
          this.unwrapItems = value as UnwrapRefSimple<T[]>;
        }
      },
      setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading;
      },
      setError(error: unknown) {
        this.error = error;
      },
    },
    getters: {
      items: (state) => state.unwrapItems as T[],
      config: () => ({
        singleton: model.$config.singleton,
      }),
    },
  });
