import { Expose } from 'class-transformer';

export const PrimaryKey = (config?: { name: string }) => {
    return (target: any, propertyKey: string) => {
        Expose({ name: config?.name })(target, propertyKey);
        Reflect.defineMetadata('model:primary-key', propertyKey, target.constructor);
    };
};
