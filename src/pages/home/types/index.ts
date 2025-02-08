import type { Store } from 'pinia';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import type { ModelStore } from '@/shared/lib/storeFactory/types';
import type { FormBuilderFields } from '@/widgets/formBuilder/types/formBuilder';
import type { CommonTemplateBuilder } from '@/widgets/templateBuilder/types';

export interface RouteSection {
  title: string;
  path: string;
  model: ClassConstructor;
  store: Store;
  formBuilder: FormBuilderFields<any>;
  templateBuilder: CommonTemplateBuilder<any>;
  singleton?: boolean;
}

export interface TypedRouteSection<T extends Model, A extends BaseAPI<T>> extends RouteSection {
  model: ClassConstructor<T>;
  store: ModelStore<T, A>;
  formBuilder: FormBuilderFields<T>;
  templateBuilder: CommonTemplateBuilder<T>
}
