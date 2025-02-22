export const ExposeResponse = () => {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(
      'model:expose-response',
      {
        ...(Reflect.getMetadata('model:expose-response', target.constructor) ?? {}),
        [propertyKey]: Reflect.getOwnPropertyDescriptor(new target.constructor(), propertyKey)
          ?.value,
      },
      target.constructor,
    );
  };
};
