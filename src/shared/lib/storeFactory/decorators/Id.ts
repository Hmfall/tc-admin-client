import { Expose } from 'class-transformer';

export const Id = (config?: { name: string }) => {
  return (target: any, propertyKey: string) => {
    Expose({ name: config?.name })(target, propertyKey);
    Reflect.defineMetadata('model:primary-key', propertyKey, target.constructor);
  };
};
