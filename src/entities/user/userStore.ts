import { storeAdapter } from '@/app/providers/store/utils';
import { User } from '@/entities/user/User';
import { storeFactory } from '@/shared/lib/storeFactory';

export const userStore = storeAdapter(storeFactory({ model: User }));
