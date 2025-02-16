import type { ClassTransformOptions } from 'class-transformer';
import { Exclude, instanceToPlain, plainToInstance } from 'class-transformer';
import { diff } from 'deep-object-diff';
import { Model } from '@/shared/lib/storeFactory';
import type { FromJSONPlain } from '@/shared/lib/storeFactory/types';
import { getOwnPropertyNames } from '@/shared/utils/getOwnPropertyNames';

export abstract class BaseModel {
  @Exclude()
  protected __snapshot: Record<string, unknown> = {};

  public get classConstructor() {
    return this.constructor as ClassConstructor<this>;
  }

  public get primaryKey(): keyof this {
    return Reflect.getMetadata('model:primary-key', this.classConstructor)?.['model:primary-key'];
  }

  public get ID() {
    return this[this.primaryKey] as ID;
  }

  public get hasDiff() {
    return !!getOwnPropertyNames(diff(this.__snapshot, this.toJSON())).length;
  }

  public makeSnapshot() {
    this.__snapshot = this.toJSON();
    return this;
  }

  public resetToSnapshot() {
    this.merge(this.__snapshot);
    return this;
  }

  public toJSON(options?: ClassTransformOptions) {
    return instanceToPlain(this, options);
  }

  public fromJSON(plain?: FromJSONPlain<this>, options?: ClassTransformOptions) {
    const instance = plainToInstance(this.classConstructor, plain, { ...options });
    instance.makeSnapshot();
    return instance;
  }

  public clone(options?: ClassTransformOptions): this {
    return this.fromJSON(this.toJSON({ ignoreDecorators: true }) as FromJSONPlain<this>, {
      ignoreDecorators: true,
      ...options,
    });
  }

  public merge(source?: typeof this | Record<string, unknown> | null) {
    if (source) {
      const snapshot = this.__snapshot;

      if (source instanceof Model) {
        Object.assign(this, source.clone());
      } else {
        Object.assign(this, source);
      }

      this.__snapshot = snapshot;
    }
  }
}
