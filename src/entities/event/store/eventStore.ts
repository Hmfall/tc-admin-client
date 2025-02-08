import { EventAPI } from '@/entities/event/api/EventAPI';
import { Event } from '@/entities/event/model/Event';
import { storeFactory } from '@/shared/lib/storeFactory';

export const eventStore = storeFactory(Event, EventAPI);
