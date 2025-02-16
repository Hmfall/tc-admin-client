interface BaseParams<T, E = unknown> {
  setData: (data: T) => void;
  setIsLoading: (value: boolean) => void;
  setError: (error: E | null) => void;
}

export interface UseRawFetchParams<T, P extends any[], E = unknown> extends BaseParams<T, E> {
  handler: (...args: P) => Promise<T>;
}
