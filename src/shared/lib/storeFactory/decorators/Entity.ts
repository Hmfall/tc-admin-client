import { Repository } from '@/shared/lib/storeFactory/model/Repository';
import type { ModelConfig } from '@/shared/lib/storeFactory/types';

export const EntityPath = (path: string) => {
  return (target: any) => {
    Reflect.defineMetadata('model:repository', new Repository(path), target);
  };
};

export const EntityConfig = (config: ModelConfig) => {
  return (target: any) => {
    Reflect.defineMetadata('model:config', config, target);
  };
};

export const Entity = <T extends ClassConstructor>(config: ModelConfig) => {
  return (constructor: T): T => {
    EntityPath(config.path)(constructor);
    EntityConfig(config)(constructor);
    return constructor;
  };
};
