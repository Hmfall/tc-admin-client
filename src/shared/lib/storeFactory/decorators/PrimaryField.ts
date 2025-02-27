import { Expose } from 'class-transformer';

export const PrimaryField = (config?: { name: string }) => {
  return (target: any, propertyKey: string) => {
    Expose({ name: config?.name })(target, propertyKey);
    Reflect.defineMetadata('model:primary-field', propertyKey, target.constructor);
  };
};
