import { Event } from '@/entities/event/Event';
import { storeFactory } from '@/shared/lib/storeFactory';

export const useEventStore = storeFactory(Event);
