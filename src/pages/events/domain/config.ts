import { AppRoutes } from '@/app/providers/router/appRoutes';
import { eventsTemplateSlots } from '@/pages/contacts/domain/template';
import { eventsFormFields } from '@/pages/events/domain/form';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { Event } from '@/entities/event/Event';
import { useEventStore } from '@/entities/event/useEventStore';

export const eventsModuleConfig: BaseModuleConfig<Event> = {
  routeName: AppRoutes.Events,
  name: 'Проводимые мероприятия',
  model: Event,
  store: useEventStore,
  formFields: eventsFormFields,
  templateSlots: eventsTemplateSlots,
};
