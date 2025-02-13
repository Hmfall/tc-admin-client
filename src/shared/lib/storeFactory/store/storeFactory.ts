import type { UnwrapRef } from 'vue';
import type { ClassConstructor } from 'class-transformer';
import type { FetchState } from '@/shared/lib/storeFactory/consts';
import { fetchState } from '@/shared/lib/storeFactory/consts';
import type { BaseAPI } from '@/shared/lib/storeFactory/model/BaseAPI';
import type { Model } from '@/shared/lib/storeFactory/model/Model';
import type { StoreFactoryConfig } from '@/shared/lib/storeFactory/types';
import { useBaseRawFetch } from '@/shared/lib/useFetch/useBaseRawFetch';

export const storeFactory = <T extends Model, A extends BaseAPI<T>>(
  model: ClassConstructor<T>,
  api: ClassConstructor<A>,
  config?: StoreFactoryConfig,
) =>
  defineStore(model.name.toString(), {
    state: (): FetchState<T, A> => ({
      ...fetchState(api),
    }),
    actions: {
      async fetch(): Promise<void> {
        await useBaseRawFetch({
          handler: () => (config?.singleton ? this.$api.fetchThis() : this.$api.fetch()),
          setData: this.setItems,
          setIsLoading: this.setIsLoading,
          setError: this.setError,
        }).execute();
      },
      setItems(unwrapItems: T[] | T) {
        if (config?.singleton && !Array.isArray(unwrapItems)) {
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
      getByIDs(IDs: ID[]) {
        // return this.unwrapItems.filter((item) => IDs.includes(item.))
      },
    },
    getters: {
      items: (state) => state.unwrapItems as T[],
      draftItems: (state) => state.unwrapDraftItems as T[],
    },
  })();
