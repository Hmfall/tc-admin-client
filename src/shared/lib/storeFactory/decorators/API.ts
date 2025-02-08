import { Model } from '@/shared/lib/storeFactory/model/Model';

export function API<T extends Model>(model: ClassConstructor<T>): ClassDecorator;

export function API(path: string): ClassDecorator;

export function API<T extends Model>(modelOrPath: ClassConstructor<T> | string) {
  return (target: any) => {
    if (typeof modelOrPath === 'function' && Reflect.getPrototypeOf(modelOrPath) === Model) {
      Reflect.defineMetadata('model:constructor', modelOrPath, target);
    } else if (typeof modelOrPath === 'string') {
      Reflect.defineMetadata('model:constructor', modelOrPath, target);
    }
  };
}
