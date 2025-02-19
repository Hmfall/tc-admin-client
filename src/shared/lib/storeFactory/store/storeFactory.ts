import type { ClassConstructor } from 'class-transformer';
import type { ModelConstructor } from 'src/shared/lib/storeFactory/model/types';
import type { FetchState } from '@/shared/lib/storeFactory/consts';
import { fetchState } from '@/shared/lib/storeFactory/consts';
import { BaseAPI } from '@/shared/lib/storeFactory/model/BaseAPI';
import type { Model } from '@/shared/lib/storeFactory/model/Model';
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
            Reflect.defineMetadata('model:api-root', options.model, API.constructor);
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
          handler: () => (this.config.singleton ? this.$api.fetchThis() : this.$api.fetch()),
          setData: this.setItems,
          setIsLoading: this.setIsLoading,
          setError: this.setError,
        }).execute();
      },
      async update(): Promise<void> {
        await this.$api.update(this.draft as T[]);
        this.draft = [];
        await this.fetch();
      },
      toDraft(item: T) {
        if (this.config.singleton && !this.draft.length) {
          this.draft.push(this.unwrapItems[0]);
          return;
        }

        const storeItem = this.unwrapItems.find((value) => value.isSame(item));

        if (storeItem) {
          if (!storeItem.within(this.draft as T[])) {
            this.draft.push(storeItem);
          }
        } else {
          this.unwrapItems.push(item as UnwrapRefSimple<T>);
          this.draft.push(item as UnwrapRefSimple<T>);
        }
      },
      deleteFromDraft(item: T) {
        if (this.config.singleton) {
          this.draft = [];
          return;
        }

        this.draft = this.draft.filter((value) => !value.isSame(item));

        if (!item.ID) {
          this.unwrapItems = this.unwrapItems.filter((value) => !value.isSame(item));
        }
      },
      initDraftWatch() {
        watch(
          () => this.unwrapItems,
          (items) => {
            this.draft = items.filter((value) => value.hasDiff);
          },
          { deep: true },
        );
      },
      setItems(unwrapItems: T[] | T) {
        if (this.config.singleton && !Array.isArray(unwrapItems)) {
          this.unwrapItems = [unwrapItems] as UnwrapRefSimple<T[]>;
        } else {
          this.unwrapItems = unwrapItems as UnwrapRefSimple<T[]>;
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
      isDraftEmpty: (state) => !!state.draft.length,
      config: () => ({
        singleton: options.model.$config.singleton,
      }),
    },
  });
