import { User } from '@/entities/user/User';
import { storeFactory } from '@/shared/lib/storeFactory';

export const useUserStore = storeFactory({ model: User });
