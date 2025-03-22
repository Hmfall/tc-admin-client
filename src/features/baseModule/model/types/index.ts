import type { AppRoutes } from '@/app/providers/router/appRoutes';
import type { AutoFormFields } from '@/features/autoForm/model/types';
import type { AutoTemplateSlots } from '@/features/autoTemplate/model/types';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import type { StoreFactoryDefinition } from '@/shared/lib/storeFactory/model/types';

export interface BaseModuleConfig<T extends Model, A extends BaseAPI<T> = BaseAPI<T>> {
  name: string;
  routeName: AppRoutes;
  model: ClassConstructor<T>;
  store: StoreFactoryDefinition<T, A>;
  formFields: AutoFormFields<T>;
  templateSlots: AutoTemplateSlots<T>;
}
