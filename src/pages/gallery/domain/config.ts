import { AppRoutes } from '@/app/providers/router/appRoutes';
import { galleryFormFields } from '@/pages/gallery/domain/form';
import { galleryTemplateSlots } from '@/pages/gallery/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { Gallery } from '@/entities/gallery/Gallery';
import { useGalleryStore } from '@/entities/gallery/useGalleryStore';

export const galleryModuleConfig: BaseModuleConfig<Gallery> = {
  routeName: AppRoutes.Gallery,
  name: 'Галерея',
  model: Gallery,
  store: useGalleryStore,
  formFields: galleryFormFields,
  templateSlots: galleryTemplateSlots,
};
