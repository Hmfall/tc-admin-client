import { Event } from '@/entities/event/model/Event';
import { storeFactory } from '@/shared/lib/storeFactory';

export const useEventStore = storeFactory(Event);
