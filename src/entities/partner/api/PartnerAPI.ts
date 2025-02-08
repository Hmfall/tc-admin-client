import { Partner } from '@/entities/partner/model/Partner';
import { API, BaseAPI } from '@/shared/lib/storeFactory';

@API(Partner)
export class PartnerAPI extends BaseAPI<Partner> {}
