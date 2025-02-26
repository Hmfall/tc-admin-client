import { eventsTemplateSlots } from '@/pages/contacts/domain/template';
import { eventsFormFields } from '@/pages/events/domain/form';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { Event } from '@/entities/event/Event';
import { eventStore } from '@/entities/event/eventStore';

export const eventsModuleConfig: BaseModuleConfig<Event> = {
  routeName: 'events',
  name: 'Проводимые мероприятия',
  model: Event,
  store: eventStore,
  formFields: eventsFormFields,
  templateSlots: eventsTemplateSlots,
};
