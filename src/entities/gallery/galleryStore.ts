import { storeAdapter } from '@/app/providers/store/utils';
import { Gallery } from '@/entities/gallery/Gallery';
import { storeFactory } from '@/shared/lib/storeFactory';

export const galleryStore = storeAdapter(storeFactory({ model: Gallery }));
