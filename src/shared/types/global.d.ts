import type { MaybeRef , DefineComponent } from 'vue';

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  export type Nullable<T> = T | null;

  export type Id = string | number;

  export type FunctionExpression = (...args: any[]) => any;

  export type ArrayElement<T> = T extends readonly (infer E)[] ? E : never;

  export type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

  export type MaybeRefObject<T> = {
    [K in keyof T]: MaybeRef<T[K]>;
  };

  export type WritablePart<T> = Pick<T, WritableKeysOf<T>>;

  export type ClassConstructor<T = unknown> = {
    new (...args: any[]): T;
  };

  export type ComponentInstance<T> = T extends new (...args: any[]) => infer R
    ? R
    : T extends (...args: any[]) => infer R
      ? R extends { __ctx?: infer K }
        ? Exclude<K, void> extends { expose: (...args: infer K) => void }
          ? K[0] & InstanceType<DefineComponent>
          : any
        : any
      : any;
}

type WritableKeysOf<T> = {
  [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>;
}[keyof T];

type IfEquals<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

/* eslint-disable */
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

export {};
