import { plainToInstance } from 'class-transformer';
import { BaseModel } from '@/shared/lib/storeFactory/model/BaseModel';
import type { Repository } from '@/shared/lib/storeFactory/model/Repository';
import { getOwnPropertyNames } from '@/shared/utils/getOwnPropertyNames';

export abstract class Model extends BaseModel {
  public static get $repository(): Repository {
    return Reflect.getMetadata('model:repository', this);
  }

  public get $repository(): Repository {
    return (this.constructor as typeof Model).$repository;
  }

  public async create(): Promise<this> {
    const response = await this.$repository.create(
      this.isMultipart ? this.formData : this.toJSON(),
    );
    return plainToInstance(this.classConstructor, response);
  }

  public async update(): Promise<this> {
    const response = await this.$repository.updateById(
      this[this.primaryKey] as Id,
      this.isMultipart ? this.formData : this.toJSON(),
    );
    return plainToInstance(this.classConstructor, response);
  }

  public async updateThis(): Promise<this> {
    const response = await this.$repository.updateThis(
      this.isMultipart ? this.formData : this.toJSON(),
    );
    return plainToInstance(this.classConstructor, response);
  }

  public async delete(): Promise<void> {
    await this.$repository.deleteById(this[this.primaryKey] as Id);
  }

  public get primaryKey(): keyof this {
    const primaryKey = Reflect.getMetadata('model:primary-key', this.constructor);

    if (!this.$config.singleton && !primaryKey) {
      console.warn(`Missing @PrimaryKey decorator: ${this.classConstructor.name.toString()}`);
    }

    return primaryKey?.['model:primary-key'];
  }

  private get formData(): FormData {
    return getOwnPropertyNames(this).reduce((fd, key) => {
      const value = this[key];

      if (typeof value !== 'undefined') {
        fd.append(String(key), value instanceof Blob ? value : String(value));
      }

      return fd;
    }, new FormData());
  }

  private get isMultipart() {
    const keys: (keyof this)[] =
      Reflect.getMetadata('model:blob-keys', this.classConstructor) ?? [];
    return keys.some((key) => this[key] instanceof Blob);
  }
}
