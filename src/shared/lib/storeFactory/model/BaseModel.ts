import type { ClassTransformOptions } from 'class-transformer';
import { Exclude, instanceToPlain, plainToInstance } from 'class-transformer';
import { diff } from 'deep-object-diff';
import { v4 as uuidv4 } from 'uuid';
import type { FromJSONPlain } from 'src/shared/lib/storeFactory/model/types';
import { getOwnPropertyNames } from '@/shared/utils/getOwnPropertyNames';

export abstract class BaseModel {
  @Exclude()
  protected __snapshot: string | null = null;

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
    return Reflect.getMetadata('model:primary-key', this.classConstructor);
  }

  public getPrimaryFieldValue(): unknown {
    return this?.[
      String(Reflect.getMetadata('model:primary-field', this.classConstructor)) as keyof this
    ];
  }

  public isSame(instance: typeof this) {
    return instance.UUID === this.__uuid;
  }

  public get hasDiff() {
    return this.__snapshot
      ? !!getOwnPropertyNames(
          diff(
            JSON.parse(JSON.stringify(this.toJSON({ excludePrefixes: ['__'] }))),
            JSON.parse(this.__snapshot),
          ),
        ).length
      : false;
  }

  public makeSnapshot() {
    this.__snapshot = JSON.stringify(instanceToPlain({ ...this }, { excludePrefixes: ['__'] }));
    return this;
  }

  public resetToSnapshot() {
    if (this.__snapshot) {
      this.merge(this.fromJSONPlain(JSON.parse(this.__snapshot)));
    }

    return this;
  }

  private fromJSONPlain(plain: Record<string, unknown>, options?: ClassTransformOptions): this {
    return plainToInstance(this.classConstructor, plain, options);
  }

  public fromJSON(plain?: FromJSONPlain<this>, options?: ClassTransformOptions): this {
    return this.fromJSONPlain(plain ?? {}, options).makeSnapshot();
  }

  public toJSON(options?: ClassTransformOptions) {
    return instanceToPlain(this, options);
  }

  public toRawJSON() {
    return this.toJSON({ excludePrefixes: ['_'] });
  }

  public clone(options?: ClassTransformOptions) {
    const snapshot = this.__snapshot;
    const instance = this.fromJSONPlain(this.toJSON(), { ...options });

    instance.__snapshot = snapshot;

    return instance;
  }

  public merge(source?: typeof this | Record<string, unknown> | null) {
    if (source) {
      const uuid = this.__uuid;
      const snapshot = this.__snapshot;

      if (source instanceof BaseModel) {
        Object.assign(this, source.clone());
      } else {
        Object.assign(this, structuredClone(source));
      }

      this.__uuid = uuid;
      this.__snapshot = snapshot;
    }

    return this;
  }
}
