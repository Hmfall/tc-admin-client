import type { BaseModuleConfig } from '@/modules/baseModule/model/types';
import { eventsTemplateSlots } from '@/modules/contacts/domain/template';
import { eventsFormFields } from '@/modules/events/domain/form';
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
