import { until } from '@vueuse/core';
import { useBaseRawFetch } from '@/shared/composables/useFetch/useBaseRawFetch';

type UseFetchData<T> = Ref<T> | Ref<T | null>;

type UseFetchError = ShallowRef<unknown | null>;

type UseFetchIsLoading = Ref<boolean>;

export interface UseFetchOptionsState<T> {
  state: UseFetchData<T>;
  error: UseFetchError;
  isLoading: UseFetchIsLoading;
}

export interface UseFetchReturnState<T> {
  data: UseFetchData<T>;
  error: UseFetchError;
  isLoading: UseFetchIsLoading;
}

type UseFetchPromiseReturn<T> = Omit<Promise<UseFetchReturn<T>>, '[Symbol.toStringTag]'>;

interface UseFetchReturn<T> extends UseFetchReturnState<T> {
  execute: () => Promise<void>;
}

export interface UseFetchOptions<T> extends Partial<UseFetchOptionsState<T>> {
  immediate?: boolean;
  initialState?: T | null;
  watchSource?: WatchSource<unknown>[] | null;
}

export const useFetch = <T>(
  handler: () => Promise<T>,
  options: UseFetchOptions<T> = {},
): UseFetchReturn<T> & UseFetchPromiseReturn<T> => {
  options.immediate = options.immediate ?? true;
  options.initialState = options.initialState ?? null;
  options.watchSource = options.watchSource ?? null;

  const data = ref(options.initialState);
  const error = shallowRef(null);
  const isLoading = ref(false);

  const updateState = <T>(state: UseFetchData<T>, value: T, optionsState?: Ref<T | null>) => {
    if (optionsState) {
      optionsState.value = value;
    }
    state.value = value;
  };

  const setData = (value: T) => {
    updateState(data, value, options.state);
  };

  const setIsLoading = (value: UnwrapRef<UseFetchIsLoading>) => {
    updateState(isLoading, value, options.isLoading);
  };

  const setError = (value: UnwrapRef<UseFetchError>) => {
    updateState(error, value, options.error);
  };

  const execute = async () => {
    await useBaseRawFetch({
      handler,
      setData,
      setError,
      setIsLoading,
    }).execute();
  };

  if (options.immediate) {
    execute();
  }

  if (options.watchSource) {
    watch(options.watchSource, () => execute());
  }

  const payload: UseFetchReturn<T> = {
    data: data as UseFetchData<T>,
    error,
    isLoading,
    execute,
  };

  const onResolveResponse = () =>
    new Promise<UseFetchReturn<T>>((resolve, reject) => {
      until(isLoading)
        .toBe(false)
        .then(() => (error.value ? reject(error.value) : resolve(payload)))
        .catch((e) => reject(e));
    });

  const promise = {
    then(onFulfilled, onRejected) {
      return onResolveResponse().then(onFulfilled, onRejected);
    },
    catch(onRejected?: (reason: any) => any): Promise<UseFetchReturn<T>> {
      return onResolveResponse().catch(onRejected);
    },
    finally(onFinally?: (() => void) | undefined | null) {
      return onResolveResponse().finally(onFinally);
    },
  } as UseFetchPromiseReturn<T>;

  return {
    ...payload,
    ...promise,
  };
};
