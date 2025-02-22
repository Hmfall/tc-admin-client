import { plainToInstance } from 'class-transformer';
import type { ModelConfig } from 'src/shared/lib/storeFactory/model/types';
import { BaseModel } from '@/shared/lib/storeFactory/model/BaseModel';
import type { Repository } from '@/shared/lib/storeFactory/model/Repository';

export abstract class Model extends BaseModel {
  public static get $config(): ModelConfig {
    return Reflect.getMetadata('model:config', this);
  }

  public static get $repository(): Repository {
    return Reflect.getMetadata('model:repository', this);
  }

  public get $config(): ModelConfig {
    return Reflect.getMetadata('model:config', this.classConstructor);
  }

  public get $repository(): Repository {
    return (this.constructor as typeof Model).$repository;
  }

  public async create(): Promise<this> {
    const response = await this.$repository.create(this.toJSON());
    return plainToInstance(this.classConstructor, response);
  }

  public async update(): Promise<this> {
    const response = await this.$repository.updateById(this.ID, this.toJSON());
    return plainToInstance(this.classConstructor, response);
  }

  public async save(): Promise<this> {
    return this.ID ? this.update() : this.create();
  }

  public async updateThis(): Promise<this> {
    const response = await this.$repository.updateThis(this.toJSON());
    return plainToInstance(this.classConstructor, response);
  }

  public async delete(): Promise<void> {
    await this.$repository.deleteById(this.ID);
  }
}
