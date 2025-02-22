import { storeAdapter } from '@/app/providers/store/utils';
import { Event } from '@/entities/event/Event';
import { storeFactory } from '@/shared/lib/storeFactory';

export const eventStore = storeAdapter(storeFactory({ model: Event }));
