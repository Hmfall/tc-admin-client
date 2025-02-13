import { plainToInstance } from 'class-transformer';
import { BaseModel } from '@/shared/lib/storeFactory/model/BaseModel';
import type { Repository } from '@/shared/lib/storeFactory/model/Repository';

export abstract class Model extends BaseModel {
  public static get $repository(): Repository {
    return Reflect.getMetadata('model:repository', this);
  }

  public get $repository(): Repository {
    return (this.constructor as typeof Model).$repository;
  }

  public async create(): Promise<this> {
    const response = await this.$repository.create(this.toJSON());
    return plainToInstance(this.classConstructor, response);
  }

  public async update(): Promise<this> {
    const response = await this.$repository.updateById(this[this.primaryKey] as ID, this.toJSON());
    return plainToInstance(this.classConstructor, response);
  }

  public async updateThis(): Promise<this> {
    const response = await this.$repository.updateThis(this.toJSON());
    return plainToInstance(this.classConstructor, response);
  }

  public async delete(): Promise<void> {
    await this.$repository.deleteById(this[this.primaryKey] as ID);
  }
}
