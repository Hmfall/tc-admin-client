export const useLoading = (defaultValue = false) => {
  const isLoading = ref(defaultValue);

  const withLoading = <T>(promise: Promise<T>) => {
    isLoading.value = true;

    promise.finally(() => {
      isLoading.value = false;
    });

    return promise;
  };

  const withLoadingFn = async <T>(fn: () => Promise<T>) => {
    isLoading.value = true;

    try {
      return await fn();
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, withLoading, withLoadingFn };
};
