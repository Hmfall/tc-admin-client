export const toReactive = <T extends object>(obj: T): T => {
  if (!isReactive(obj)) {
    return reactive(obj) as T;
  } else {
    return obj as T;
  }
};
