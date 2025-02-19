import type { AxiosRequestConfig } from 'axios';
import { plainToInstance } from 'class-transformer';
import type { Model } from '@/shared/lib/storeFactory';
import { Repository } from '@/shared/lib/storeFactory/model/Repository';

export abstract class BaseAPI<T extends Model> {
  private static get $repository(): Repository {
    const APIRootMeta: typeof Model | string = Reflect.getMetadata('model:api-root', this);

    if (typeof APIRootMeta !== 'string') {
      return APIRootMeta.$repository;
    }

    return new Repository(APIRootMeta);
  }

  private get $repository(): Repository {
    return (this.constructor as typeof BaseAPI).$repository;
  }

  private getModelConstuctor<T extends Model>(): ClassConstructor<T> {
    return Reflect.getMetadata('model:constructor', this.constructor);
  }

  public get api() {
    const repository = this.$repository;

    const parseUrl = (url: string) =>
      (url === '/' || url === '' ? '' : `/${url}`).replace('//', '/');

    return {
      get<T, D = unknown>(url: string, config?: AxiosRequestConfig<D>) {
        return repository.get<T, D>(parseUrl(url), config);
      },
      post<T, D = unknown>(url: string, body?: D, config?: AxiosRequestConfig<D>) {
        return repository.post<T, D>(parseUrl(url), body, config);
      },
      put<T, D = unknown>(url: string, body?: D, config?: AxiosRequestConfig<D>) {
        return repository.put<T, D>(parseUrl(url), body, config);
      },
      patch<T, D = unknown>(url: string, body?: D, config?: AxiosRequestConfig<D>) {
        return repository.patch<T, D>(parseUrl(url), body, config);
      },
      delete<T, D = unknown>(url: string, config?: AxiosRequestConfig<D>) {
        return repository.delete<T, D>(parseUrl(url), config);
      },
      path: repository.path,
    };
  }

  public async fetch(): Promise<T[]> {
    return plainToInstance(this.getModelConstuctor<T>(), await this.$repository.getAll()).map(
      (instance) => instance.makeSnapshot(),
    );
  }

  public async fetchThis(): Promise<T> {
    return plainToInstance(
      this.getModelConstuctor<T>(),
      await this.$repository.getThis(),
    ).makeSnapshot();
  }

  public async fetchById(id: ID): Promise<T> {
    return plainToInstance(
      this.getModelConstuctor<T>(),
      await this.$repository.getById(id),
    ).makeSnapshot();
  }

  // TODO: makeSnapshot on update?
  public async update(items: T[]): Promise<void> {
    return await this.$repository.updateAll(items.map((item) => item.toJSON()));
  }

  public async deleteById(id: ID): Promise<void> {
    return await this.$repository.deleteById(id);
  }
}
