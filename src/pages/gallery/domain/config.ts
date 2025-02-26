import { galleryFormFields } from '@/pages/gallery/domain/form';
import { galleryTemplateSlots } from '@/pages/gallery/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { Gallery } from '@/entities/gallery/Gallery';
import { galleryStore } from '@/entities/gallery/galleryStore';

export const galleryModuleConfig: BaseModuleConfig<Gallery> = {
  routeName: 'gallery',
  name: 'Галерея',
  model: Gallery,
  store: galleryStore,
  formFields: galleryFormFields,
  templateSlots: galleryTemplateSlots,
};
