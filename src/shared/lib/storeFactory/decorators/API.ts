import type { Model } from '@/shared/lib/storeFactory/model/Model';

export function API<T extends Model>(model: ClassConstructor<T>): ClassDecorator;

export function API(path: string): ClassDecorator;

export function API<T extends Model>(value: ClassConstructor<T> | string) {
  return (target: any) => {
    Reflect.defineMetadata('model:constructor', value, target);
  };
}
