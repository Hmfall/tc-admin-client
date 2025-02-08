import { GalleryAPI } from '@/entities/gallery/api/GalleryAPI';
import { Gallery } from '@/entities/gallery/model/Gallery';
import { storeFactory } from '@/shared/lib/storeFactory';

export const galleryStore = storeFactory(Gallery, GalleryAPI, { singleton: true });
