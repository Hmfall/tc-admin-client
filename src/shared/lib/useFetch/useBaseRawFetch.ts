import type { UseRawFetchParams } from '@/shared/lib/useFetch/types';

export const useBaseRawFetch = <T, P extends any[] = unknown[]>(
  params: UseRawFetchParams<T, P>,
) => {
  const { handler, setData, setIsLoading, setError } = params;

  const execute = async (...args: P) => {
    try {
      setError && unref(setError)(null);

      setIsLoading && unref(setIsLoading)(true);

      const response = await handler(...args);

      unref(setData)(response);

      return response;
    } catch (error) {
      setError && unref(setError)(error);
      return Promise.reject(error);
    } finally {
      setIsLoading && unref(setIsLoading)(false);
    }
  };

  return { execute };
};
