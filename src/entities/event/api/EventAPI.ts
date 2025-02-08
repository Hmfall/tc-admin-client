import { Event } from '@/entities/event/model/Event';
import { API, BaseAPI } from '@/shared/lib/storeFactory';

@API(Event)
export class EventAPI extends BaseAPI<Event> {}
