import { defineStoreAdapter } from '@/app/providers/store/utils';
import { Partner } from '@/entities/partner/Partner';
import { storeFactory } from '@/shared/lib/storeFactory';

export const partnerStore = defineStoreAdapter(storeFactory({ model: Partner }));
