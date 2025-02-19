import type { ClassTransformOptions } from 'class-transformer';
import { Exclude, instanceToPlain, plainToInstance } from 'class-transformer';
import { diff } from 'deep-object-diff';
import { v4 as uuidv4 } from 'uuid';
import type { FromJSONPlain } from 'src/shared/lib/storeFactory/model/types';
import { getOwnPropertyNames } from '@/shared/utils/getOwnPropertyNames';

export abstract class BaseModel {
  @Exclude()
  protected __snapshot: string;

  @Exclude()
  protected __uuid: string;

  constructor() {
    this.makeSnapshot();
    this.__uuid = uuidv4();
  }

  public get ID() {
    return this[this.getPrimaryKey()] as ID;
  }

  public get UUID() {
    return this.__uuid;
  }

  protected get classConstructor() {
    return this.constructor as ClassConstructor<this>;
  }

  public getPrimaryKey<T extends keyof this>(): T {
    return Reflect.getMetadata('model:primary-key', this.classConstructor)?.['model:primary-key'];
  }

  public isSame(instance: typeof this) {
    return instance.UUID === this.__uuid;
  }

  public within(target: (typeof this)[]) {
    return target.some((value) => value?.isSame(this));
  }

  public get hasDiff() {
    return !!getOwnPropertyNames(
      diff(JSON.parse(JSON.stringify(this.toRawJSON())), JSON.parse(this.__snapshot)),
    ).length;
  }

  public makeSnapshot() {
    this.__snapshot = JSON.stringify(this.toRawJSON());
    return this;
  }

  public resetToSnapshot() {
    this.merge(this.fromJSONPlain(JSON.parse(this.__snapshot)));
    return this;
  }

  private fromJSONPlain(plain: Record<string, unknown>, options?: ClassTransformOptions): this {
    return plainToInstance(this.classConstructor, plain, options);
  }

  private toRawJSON() {
    return this.toJSON({ ignoreDecorators: true, excludePrefixes: ['__'] });
  }

  public fromJSON(plain?: FromJSONPlain<this>, options?: ClassTransformOptions): this {
    return this.fromJSONPlain(plain ?? {}, options).makeSnapshot();
  }

  public toJSON(options?: ClassTransformOptions) {
    return instanceToPlain(this, options);
  }

  public clone(options?: ClassTransformOptions) {
    return this.fromJSONPlain(this.toJSON({ ignoreDecorators: true }), {
      ignoreDecorators: true,
      ...options,
    });
  }

  public merge(source?: typeof this | Record<string, unknown> | null) {
    if (source) {
      const uuid = this.__uuid;
      const snapshot = this.__snapshot;

      if (source instanceof BaseModel) {
        // TODO: source.clone ?
        Object.assign(this, source.clone());
      } else {
        Object.assign(this, source);
      }

      this.__uuid = uuid;
      this.__snapshot = snapshot;
    }
  }
}
