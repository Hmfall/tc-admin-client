export const Blob = () => {
  return (target: any, propertyKey: string) => {
    const metadata = Reflect.getMetadata('model:blob-keys', target.constructor) ?? [];
    metadata.push(propertyKey);
    Reflect.defineMetadata('model:blob-keys', Array.from(metadata), target.constructor);
  };
};
