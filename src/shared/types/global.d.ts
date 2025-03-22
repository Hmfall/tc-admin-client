import type { DefineComponent } from 'vue';
// eslint-disable-next-line vue/prefer-import-from-vue
import type { UnwrapRefSimple as VueUnwrapRefSimple } from '@vue/reactivity';

declare global {
  export type UUID = string;

  export type ID = number;

  export type FunctionExpression<T = any> = (...args: any[]) => T;

  export type Plain<T = unknown> = Record<string, T>;

  export type ArrayElement<T> = T extends readonly (infer E)[] ? E : never;

  export type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

  export type MaybeRefObject<T> = {
    [K in keyof T]: MaybeRef<T[K]>;
  };

  export type UnwrapRefSimple<T> = VueUnwrapRefSimple<T>;

  export type ClassConstructor<T = unknown> = {
    new (...args: any[]): T;
  };

  export type ComponentInstance<T> = T extends new (...args: any[]) => infer R
    ? R
    : T extends (...args: any[]) => infer R
      ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
        R extends { __ctx?: infer K }
        ? Exclude<K, void> extends { expose: (...args: infer K) => void }
          ? K[0] & InstanceType<DefineComponent>
          : any
        : any
      : any;
}

/* eslint-disable */
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

export {};
