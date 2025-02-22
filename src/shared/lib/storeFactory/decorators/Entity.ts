import { Expose } from 'class-transformer';
import type { ModelConfig } from 'src/shared/lib/storeFactory/model/types';
import { Repository } from '@/shared/lib/storeFactory/model/Repository';

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

export const ExposeEntityOwnKeys = () => {
    return (target: any) => {
        (Reflect.ownKeys(new target()) ?? [])
            .filter((key) => !String(key).startsWith('__'))
            .forEach((key) => Expose()(target, key));
    };
};

export const Entity = <T extends ClassConstructor>(config: ModelConfig) => {
    config.exposeOwn = config.exposeOwn ?? true;

    return (constructor: T): T => {
        if (config.exposeOwn) {
            ExposeEntityOwnKeys()(constructor);
        }

        EntityPath(config.path)(constructor);
        EntityConfig(config)(constructor);

        return constructor;
    };
};
