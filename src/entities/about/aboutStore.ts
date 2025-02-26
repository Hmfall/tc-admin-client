import { defineStoreAdapter } from '@/app/providers/store/utils';
import { About } from '@/entities/about/About';
import { storeFactory } from '@/shared/lib/storeFactory';

export const aboutStore = defineStoreAdapter(storeFactory(About));
