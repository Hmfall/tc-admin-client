import { AboutAPI } from '@/entities/about/api/AboutAPI';
import { About } from '@/entities/about/model/About';
import { storeFactory } from '@/shared/lib/storeFactory';

export const aboutStore = storeFactory(About, AboutAPI, { singleton: true });
