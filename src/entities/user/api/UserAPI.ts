import { User } from '@/entities/user/model/User';
import { API, BaseAPI } from '@/shared/lib/storeFactory';

@API(User)
export class UserAPI extends BaseAPI<User> {}
