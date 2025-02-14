import { UserAPI } from '@/entities/user/api/UserAPI';
import { User } from '@/entities/user/model/User';
import { storeFactory } from '@/shared/lib/storeFactory';

export const userStore = storeFactory(User, UserAPI);
