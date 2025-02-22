import { storeAdapter } from '@/app/providers/store/utils';
import { Partner } from '@/entities/partner/Partner';
import { storeFactory } from '@/shared/lib/storeFactory';

export const partnerStore = storeAdapter(storeFactory({ model: Partner }));
