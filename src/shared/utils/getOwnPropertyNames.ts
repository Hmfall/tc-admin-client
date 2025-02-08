export const getOwnPropertyNames = Object.getOwnPropertyNames as <T extends object>(
  obj: T,
) => Array<keyof T>;
