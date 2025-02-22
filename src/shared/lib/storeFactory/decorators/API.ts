import type { ClassConstructor } from 'class-transformer';
import type { Model } from '@/shared/lib/storeFactory/model/Model';

export const API = <T extends Model>(value: string | ClassConstructor<T>) => {
    return (target: any) => {
        Reflect.defineMetadata('model:api-root', value, target);
        Reflect.defineMetadata('model:constructor', value, target);
    };
};
