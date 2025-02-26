import type { AxiosRequestConfig, GenericAbortSignal } from 'axios';
import { plainToInstance } from 'class-transformer';
import type { Model } from '@/shared/lib/storeFactory';
import { BaseAxiosAPI } from '@/shared/lib/storeFactory/model/BaseAxiosAPI';
import { Repository } from '@/shared/lib/storeFactory/model/Repository';
import type { ModelConfig } from '@/shared/lib/storeFactory/model/types';

export class BaseAPI<
  T extends Model | unknown = unknown,
  M extends ClassConstructor<T> & {
    $config: ModelConfig;
  } = ClassConstructor<T> & { $config: ModelConfig },
> extends BaseAxiosAPI {
  public $model: M | null = null;

  constructor(path?: string) {
    super(path);

    if (!path) {
      this.APIPath = Reflect.getMetadata('api:path', this.constructor);
    }
  }

  public get $repository(): Repository {
    return new Repository(this.path);
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

  private instanceGuard(value: any): value is InstanceType<typeof Model> {
    return value.constructor.prototype === this?.$model?.prototype;
  }

  private processedInstance<T>(response: unknown): T {
    if (this.$model) {
      const instance = plainToInstance(this.$model, response);

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

  public async load(options?: { signal?: GenericAbortSignal }) {
    return this.processedInstance<T[]>(await this.$repository.getAll({}, options));
  }

  public async loadThis(options?: { signal?: GenericAbortSignal }) {
    return this.processedInstance<T>(await this.$repository.getAll({}, options));
  }

  public async loadById(id: ID) {
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
