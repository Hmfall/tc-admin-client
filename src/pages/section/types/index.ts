import type { Store } from 'pinia';
import type { BaseAPI, Model } from '@/shared/lib/storeFactory';
import type { ModelStore } from '@/shared/lib/storeFactory/types';
import type { FormBuilderFields } from '@/widgets/formBuilder/types';
import type { TemplateBuilderSlots } from '@/widgets/templateBuilder/types';

export interface CommonRouteSection {
  title: string;
  routeName: string;
  model: ClassConstructor;
  store: Store;
  formFields: FormBuilderFields<any>;
  templateSlots: TemplateBuilderSlots<any>;
  singleton?: boolean;
}

export interface RouteSection<T extends Model, A extends BaseAPI<T>> extends CommonRouteSection {
  model: ClassConstructor<T>;
  store: ModelStore<T, A>;
  formFields: FormBuilderFields<T>;
  templateSlots: TemplateBuilderSlots<T>;
}

export enum CardTemplateSlot {
  image = 'image',
  previewImage = 'previewImage',
  title = 'title',
  subtitle = 'subtitle',
  text = 'text',
  link = 'link',
}
