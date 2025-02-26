import { defineStoreAdapter } from '@/app/providers/store/utils';
import { Event } from '@/entities/event/Event';
import { storeFactory } from '@/shared/lib/storeFactory';

export const eventStore = defineStoreAdapter(storeFactory(Event));
