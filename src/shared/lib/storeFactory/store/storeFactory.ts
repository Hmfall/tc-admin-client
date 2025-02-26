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
          handler: () =>
            this.config.singleton ? this.$api.loadThis(options) : this.$api.load(options),
          setData: this.setItems,
          setIsLoading: this.setIsLoading,
          setError: this.setError,
        }).execute();
      },
      async update(): Promise<void> {
        await model.$api.update(this.draft as T[]);
        this.draft = [];
        await this.load();
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
        singleton: model.$config.singleton,
      }),
    },
  });
