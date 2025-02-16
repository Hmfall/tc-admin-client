import { Gallery } from '@/entities/gallery/model/Gallery';
import { storeFactory } from '@/shared/lib/storeFactory';

export const galleryStore = storeFactory({ model: Gallery });
