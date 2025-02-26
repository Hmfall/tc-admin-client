export const toRef = <T>(value: T): Ref<T> => {
  if (!isRef(value)) {
    return ref(value) as Ref<T>;
  } else {
    return value as Ref<T>;
  }
};
