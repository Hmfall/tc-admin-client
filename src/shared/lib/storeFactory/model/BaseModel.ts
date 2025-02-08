import type { ClassTransformOptions } from 'class-transformer';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Model } from '@/shared/lib/storeFactory';
import type { FromJSONPlain, InstancePlain, ModelConfig } from '@/shared/lib/storeFactory/types';

export abstract class BaseModel {
  public get $config(): ModelConfig {
    return Reflect.getMetadata('model:config', this.classConstructor);
  }

  public get classConstructor(): ClassConstructor<this> {
    return this.constructor as ClassConstructor<this>;
  }

  public toJSON(options?: ClassTransformOptions): Record<string, unknown> {
    return instanceToPlain(this, options);
  }

  public fromJSON(plain: FromJSONPlain<this>, options?: ClassTransformOptions): this {
    return plainToInstance(this.classConstructor, plain, {
      exposeUnsetFields: false,
      ...options,
    });
  }

  public clone(): this {
    return this.fromJSON(this.toJSON({ ignoreDecorators: true }) as FromJSONPlain<this>, {
      ignoreDecorators: true,
    });
  }

  public merge(source: this | InstancePlain<this> | null | undefined) {
    if (source) {
      if (source instanceof Model) {
        Object.assign(this, source.clone());
      } else if (typeof source === 'object') {
        Object.assign(this, this.fromJSON(source));
      }
    }
  }
}
