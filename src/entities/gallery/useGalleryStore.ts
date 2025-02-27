import { Gallery } from '@/entities/gallery/Gallery';
import { storeFactory } from '@/shared/lib/storeFactory';

export const useGalleryStore = storeFactory(Gallery);
