export const API = (path: string) => {
  return (target: any) => {
    Reflect.defineMetadata('api:path', path, target.prototype);
  };
};
