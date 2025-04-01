import type { ClassConstructor } from 'class-transformer';
import type { BaseAPI, Model, storeFactory } from '@/shared/lib/storeFactory';

export interface ModelConfig {
  singleton?: boolean;
  exposeOwn?: boolean;
}

export type FromJSONPlain<T> = Partial<
  Omit<
    T,
    | '$config'
    | '$repository'
    | 'ID'
    | 'UUID'
    | 'isSame'
    | 'create'
    | 'update'
    | 'load'
    | 'delete'
    | 'fromJSON'
    | 'toJSON'
    | 'clone'
    | 'merge'
    | 'hasDiff'
    | 'makeSnapshot'
    | 'resetToSnapshot'
    | 'getPrimaryKey'
  >
>;

export interface ModelConstructor<T> extends ClassConstructor<T> {
  $config: ModelConfig;
  $api: BaseAPI;
}

export type StoreFactoryDefinition<T extends Model, A extends BaseAPI<T>> = ReturnType<
  typeof storeFactory<T, A>
>;

export type StoreFactoryReturn<T extends Model, A extends BaseAPI<T>> = ReturnType<
  StoreFactoryDefinition<T, A>
>;
