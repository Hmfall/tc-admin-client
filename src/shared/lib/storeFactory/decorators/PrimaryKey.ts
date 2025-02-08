import { Expose } from 'class-transformer';

export const PrimaryKey = (config?: { name: string }) => {
  return (target: any, propertyKey: string) => {
    Expose({ name: config?.name })(target, propertyKey);
    const metadata = Reflect.getMetadata('model:primary-key', target.constructor) ?? {};
    metadata['model:primary-key'] = propertyKey;
    Reflect.defineMetadata('model:primary-key', metadata, target.constructor);
  };
};
