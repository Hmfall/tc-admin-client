import { Social } from '@/entities/social/model/Social';
import { API, BaseAPI } from '@/shared/lib/storeFactory';

@API(Social)
export class SocialAPI extends BaseAPI<Social> {}
