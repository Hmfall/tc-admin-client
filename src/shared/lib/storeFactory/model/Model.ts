import { plainToInstance } from 'class-transformer';
import type { ModelConfig } from 'src/shared/lib/storeFactory/model/types';
import type { BaseAPI } from '@/shared/lib/storeFactory';
import { BaseModel } from '@/shared/lib/storeFactory/model/BaseModel';
import type { Repository } from '@/shared/lib/storeFactory/model/Repository';

export abstract class Model extends BaseModel {
  static $api: BaseAPI;

  public static get $config(): ModelConfig {
    return Reflect.getMetadata('model:config', this);
  }

  public get $config(): ModelConfig {
    return Reflect.getMetadata('model:config', this.classConstructor);
  }

  public get $repository(): Repository {
    return (this.constructor as typeof Model).$api.$repository;
  }

  public async create(): Promise<this> {
    const response = await this.$repository.create(this.toRawJSON());
    return plainToInstance(this.classConstructor, response);
  }

  public async update(): Promise<this> {
    const response = await (this.$config.singleton
      ? this.$repository.updateThis(this.toRawJSON())
      : this.$repository.updateById(this.ID, this.toRawJSON()));
    return plainToInstance(this.classConstructor, response);
  }

  public async updateWithPlain<P = Record<string, unknown>>(plain: P): Promise<this> {
    const response = this.$repository.updateById<P>(this.ID, plain);
    return plainToInstance(this.classConstructor, response);
  }

  public async load(): Promise<this> {
    const response = await (this.$config.singleton
      ? this.$repository.getAll()
      : this.$repository.getById(this.ID));
    return this.merge(plainToInstance(this.classConstructor, response)).makeSnapshot();
  }

  public async delete(): Promise<void> {
    await (this.$config.singleton
      ? this.$repository.deleteThis()
      : this.$repository.deleteById(this.ID));
  }
}
