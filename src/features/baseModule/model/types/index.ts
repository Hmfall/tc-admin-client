import type { FormBuilderFields } from '@/features/formBuilder/model/types';
import type { TemplateBuilderSlots } from '@/features/templateBuilder/model/types';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import type { StoreFactoryDefinition } from '@/shared/lib/storeFactory/model/types';

export interface BaseModuleConfig<T extends Model, A extends BaseAPI<T> = BaseAPI<T>> {
  name: string;
  routeName: string;
  model: ClassConstructor<T>;
  store: StoreFactoryDefinition<T, A>;
  formFields: FormBuilderFields<T>;
  templateSlots: TemplateBuilderSlots<T>;
  singleton?: boolean;
}
