import type { ModelStore } from 'src/shared/lib/storeFactory/model/types';
import type { FormBuilderFields } from '@/widgets/formBuilder/model/types';
import type { TemplateBuilderSlots } from '@/widgets/templateBuilder/model/types';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';

export interface BaseModuleConfig<T extends Model, A extends BaseAPI<T> = BaseAPI<T>> {
  name: string;
  routeName: string;
  model: ClassConstructor<T>;
  store: () => ModelStore<T, A>;
  formFields: FormBuilderFields<T>;
  templateSlots: TemplateBuilderSlots<T>;
  singleton?: boolean;
}
