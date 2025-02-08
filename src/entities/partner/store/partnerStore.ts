import { PartnerAPI } from '@/entities/partner/api/PartnerAPI';
import { Partner } from '@/entities/partner/model/Partner';
import { storeFactory } from '@/shared/lib/storeFactory';

export const partnerStore = storeFactory(Partner, PartnerAPI);
