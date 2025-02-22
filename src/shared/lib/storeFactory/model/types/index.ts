import type { ClassConstructor } from 'class-transformer';
import type { BaseAPI, Model, storeFactory } from '@/shared/lib/storeFactory';
import type { Repository } from '@/shared/lib/storeFactory/model/Repository';

export interface ModelConfig {
  path: string;
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
    | 'within'
    | 'create'
    | 'update'
    | 'updateThis'
    | 'save'
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

export interface ModelConstructor<T extends Model> extends ClassConstructor<T> {
  $config: ModelConfig;
  $repository: Repository;
}

export type StoreFactoryDefinition<T extends Model, A extends BaseAPI<T>> = ReturnType<
  typeof storeFactory<T, A>
>;

export type StoreFactoryReturn<T extends Model, A extends BaseAPI<T>> = ReturnType<
  StoreFactoryDefinition<T, A>
>;
