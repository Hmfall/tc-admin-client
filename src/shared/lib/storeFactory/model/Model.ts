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
    const response = await this.$repository.create(this.toJSON());
    return plainToInstance(this.classConstructor, response);
  }

  public async update(): Promise<this> {
    const response = await this.$repository.updateById(
      this.ID,
      this.toJSON({ excludePrefixes: ['_'] }),
    );
    return plainToInstance(this.classConstructor, response);
  }

  public async load(): Promise<this> {
    return this.merge(await this.$repository.getById(this.ID)).makeSnapshot();
  }

  public async updateThis(): Promise<this> {
    const response = await this.$repository.updateThis(this.toJSON({ excludePrefixes: ['_'] }));
    return plainToInstance(this.classConstructor, response);
  }

  public async delete(): Promise<void> {
    await this.$repository.deleteById(this.ID);
  }
}
