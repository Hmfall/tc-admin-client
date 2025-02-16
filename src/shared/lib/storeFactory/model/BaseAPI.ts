import type { AxiosRequestConfig } from 'axios';
import { Repository } from '@/shared/lib/storeFactory/model/Repository';
import { toModel } from '@/shared/lib/storeFactory/utils/toModel';

export abstract class BaseAPI<T = unknown> {
  private static get $repository(): Repository {
    const repositoryMeta: ClassConstructor | string = Reflect.getMetadata(
      'model:constructor',
      this,
    );

    if (typeof repositoryMeta === 'function') {
      return Reflect.getMetadata('model:constructor', this).$repository;
    }

    return new Repository(repositoryMeta);
  }

  private get $repository(): Repository {
    return (this.constructor as typeof BaseAPI).$repository;
  }

  private get modelConstuctor() {
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
    return toModel([this.modelConstuctor], await this.$repository.getAll<T>());
  }

  public async fetchThis(): Promise<T> {
    return toModel(this.modelConstuctor, await this.$repository.getAll<T>());
  }

  public async fetchById(id: ID): Promise<T> {
    return toModel(this.modelConstuctor, await this.$repository.getById<T>(id));
  }

  public async deleteById(id: ID): Promise<void> {
    return await this.$repository.deleteById(id);
  }
}
