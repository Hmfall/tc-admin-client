import type { AxiosRequestConfig } from 'axios';
import { plainToInstance } from 'class-transformer';
import type { Model } from '@/shared/lib/storeFactory';
import { Repository } from '@/shared/lib/storeFactory/model/Repository';

export abstract class BaseAPI<
  T extends Model | unknown = unknown,
  C extends ClassConstructor<T> = ClassConstructor<T>,
> {
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

  private getModelConstuctor(): C {
    return Reflect.getMetadata('model:constructor', this.constructor);
  }

  private instanceGuard(value: any): value is InstanceType<typeof Model> {
    return value.constructor.prototype === this.getModelConstuctor().prototype;
  }

  private processedInstance<T>(response: unknown): T {
    if (this.getModelConstuctor()) {
      const instance = plainToInstance(this.getModelConstuctor(), response);

      return (
        Array.isArray(instance)
          ? instance.map((value) => value.makeSnapshot())
          : this.instanceGuard(instance)
            ? instance.makeSnapshot()
            : null
      ) as T;
    }

    return response as T;
  }

  private processedPlain<T, P extends Plain | Plain[]>(value: T | T[]): P {
    return (
      Array.isArray(value)
        ? value.map((item) => (this.instanceGuard(item) ? item.toJSON() : item))
        : value
    ) as P;
  }

  public async fetch() {
    return this.processedInstance<T[]>(await this.$repository.getAll());
  }

  public async fetchThis() {
    return this.processedInstance<T>(await this.$repository.getThis());
  }

  public async fetchById(id: ID) {
    return this.processedInstance<T>(await this.$repository.getById(id));
  }

  // TODO: makeSnapshot on update?
  public async update(items: T[]): Promise<void> {
    return await this.$repository.updateAll(this.processedPlain(items));
  }

  public async deleteById(id: ID): Promise<void> {
    return await this.$repository.deleteById(id);
  }
}
