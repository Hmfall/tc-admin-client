import type { BaseModuleConfig } from '@/modules/baseModule/model/types';
import { galleryFormFields } from '@/modules/gallery/domain/form';
import { galleryTemplateSlots } from '@/modules/gallery/domain/template';
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
