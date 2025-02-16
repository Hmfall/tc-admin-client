import type { UnwrapRef } from 'vue';
import type { ClassConstructor } from 'class-transformer';
import pinia from '@/app/providers/store';
import type { FetchState } from '@/shared/lib/storeFactory/consts';
import { fetchState } from '@/shared/lib/storeFactory/consts';
import { BaseAPI } from '@/shared/lib/storeFactory/model/BaseAPI';
import type { Model } from '@/shared/lib/storeFactory/model/Model';
import type { ModelConstructor } from '@/shared/lib/storeFactory/types';
import { useBaseRawFetch } from '@/shared/lib/useFetch/useBaseRawFetch';

export const storeFactory = <T extends Model, A extends BaseAPI<T>>(options: {
  model: ModelConstructor<T>;
  api?: ClassConstructor<A>;
}) =>
  defineStore(options.model.$config.path, {
    state: (): FetchState<T, A> => {
      const modelAPI = options.api
        ? new options.api()
        : (() => {
            const API = new (class extends BaseAPI<T> {})() as A;
            Reflect.defineMetadata('model:constructor', options.model, API.constructor);
            return API;
          })();

      return {
        ...fetchState(modelAPI),
      };
    },
    actions: {
      async fetch(): Promise<void> {
        await useBaseRawFetch({
          handler: () =>
            options.model.$config.singleton ? this.$api.fetchThis() : this.$api.fetch(),
          setData: this.setItems,
          setIsLoading: this.setIsLoading,
          setError: this.setError,
        }).execute();
      },
      setItems(unwrapItems: T[] | T) {
        if (options.model.$config.singleton && !Array.isArray(unwrapItems)) {
          this.unwrapItems = [unwrapItems] as UnwrapRef<T[]>;
        } else {
          this.unwrapItems = unwrapItems as UnwrapRef<T[]>;
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
        singleton: options.model.$config.singleton,
      }),
    },
  })(pinia);
