import { Event } from '@/entities/event/model/Event';

export const eventModelGuard = (value: unknown): value is InstanceType<typeof Event> => {
  return value instanceof Event;
};
