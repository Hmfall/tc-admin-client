import { Social } from '@/entities/social/Social';
import { storeFactory } from '@/shared/lib/storeFactory';

export const socialStore = storeFactory({ model: Social });
