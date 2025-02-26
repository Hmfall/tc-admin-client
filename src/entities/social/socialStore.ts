import { defineStoreAdapter } from '@/app/providers/store/utils';
import { Social } from '@/entities/social/Social';
import { storeFactory } from '@/shared/lib/storeFactory';

export const socialStore = defineStoreAdapter(storeFactory(Social));
