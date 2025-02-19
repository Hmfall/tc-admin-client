import { Partner } from '@/entities/partner/Partner';
import { storeFactory } from '@/shared/lib/storeFactory';

export const partnerStore = storeFactory({ model: Partner });
