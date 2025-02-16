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
      get<T>(url: string, config?: AxiosRequestConfig<T>): Promise<T> {
        return repository.get<T>(parseUrl(url), config);
      },
      post<T>(url: string, body?: T, config?: AxiosRequestConfig<T>) {
        return repository.post<T>(parseUrl(url), body, config);
      },
      put<T>(url: string, body?: T, config?: AxiosRequestConfig<T>) {
        return repository.put<T>(parseUrl(url), body, config);
      },
      patch<T>(url: string, body?: T, config?: AxiosRequestConfig<T>) {
        return repository.patch<T>(parseUrl(url), body, config);
      },
      delete<T>(url: string, config?: AxiosRequestConfig<T>) {
        return repository.delete<T>(parseUrl(url), config);
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
