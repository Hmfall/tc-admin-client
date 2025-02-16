import type { ClassConstructor } from 'class-transformer';
import type { BaseAPI, Model, storeFactory } from '@/shared/lib/storeFactory';
import type { Repository } from '@/shared/lib/storeFactory/model/Repository';

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

export interface ModelConstructor<T extends Model> extends ClassConstructor<T> {
  $config: ModelConfig;
  $repository: Repository;
}

export type ThisJSON<T> = Record<Partial<keyof T>, unknown>;

export type ModelStore<T extends Model, A extends BaseAPI<T>> = ReturnType<
  typeof storeFactory<T, A>
>;

export type InstancePlain<T> = Record<Partial<keyof InstanceType<ClassConstructor<T>>>, any>;
