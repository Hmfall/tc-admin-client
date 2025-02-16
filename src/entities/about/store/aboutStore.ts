import { About } from '@/entities/about/model/About';
import { storeFactory } from '@/shared/lib/storeFactory';

export const aboutStore = storeFactory({ model: About });
