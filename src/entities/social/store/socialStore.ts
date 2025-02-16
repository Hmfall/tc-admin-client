import { Social } from '@/entities/social/model/Social';
import { storeFactory } from '@/shared/lib/storeFactory';

export const socialStore = storeFactory({ model: Social });
