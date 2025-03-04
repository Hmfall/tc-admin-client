import { Expose } from 'class-transformer';
import type { ModelConfig } from 'src/shared/lib/storeFactory/model/types';
import type { Model } from '@/shared/lib/storeFactory';

export const EntityConfig = (config: ModelConfig) => {
  return (target: any) => {
    Reflect.defineMetadata('model:config', config, target);
  };
};

export const ExposeEntityOwnKeys = () => {
  return (target: any) => {
    (Reflect.ownKeys(new target()) ?? [])
      .filter((key) => !String(key).startsWith('__'))
      .forEach((key) => Expose()(target, key));
  };
};

const ModelConstructor = () => {
  return (target: any) => {
    if (typeof target.$api?.$model !== 'undefined') {
      (target as typeof Model).$api.$model = target;
    }
  };
};

export const Entity = <T extends ClassConstructor>(config: ModelConfig = {}) => {
  config.exposeOwn = config.exposeOwn ?? false;

  return (constructor: T): T => {
    ModelConstructor()(constructor);

    if (config.exposeOwn) {
      ExposeEntityOwnKeys()(constructor);
    }

    EntityConfig(config)(constructor);

    return constructor;
  };
};
