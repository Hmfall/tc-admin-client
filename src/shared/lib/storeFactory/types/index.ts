import type { BaseAPI, Model, storeFactory } from '@/shared/lib/storeFactory';

export interface StoreFactoryConfig {
  singleton?: boolean;
}

export interface ModelConfig {
  path: string;
  singleton?: boolean;
}

export type FromJSONPlain<This> = Partial<
  Omit<
    This,
    | 'create'
    | 'update'
    | 'updateThis'
    | 'delete'
    | 'fromJSON'
    | 'toJSON'
    | 'clone'
    | 'merge'
    | 'ID'
    | 'primaryKey'
    | 'classConstructor'
    | '$config'
    | '$repository'
  >
>;

export type ModelStore<T extends Model, A extends BaseAPI<T>> = ReturnType<
  typeof storeFactory<T, A>
>;

export type InstancePlain<T> = Record<keyof InstanceType<ClassConstructor<T>>, any>;
