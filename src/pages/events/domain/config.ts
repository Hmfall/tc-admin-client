import { AppRoutes } from '@/app/providers/router/appRoutes';
import { eventFormFields } from '@/pages/events/domain/form';
import { eventTemplateSlots } from '@/pages/events/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { Event } from '@/entities/event/model/Event';
import { useEventStore } from '@/entities/event/store/useEventStore';

export const eventsModuleConfig: BaseModuleConfig<Event> = {
  routeName: AppRoutes.Events,
  name: 'Проводимые мероприятия',
  model: Event,
  store: useEventStore,
  formFields: eventFormFields,
  templateSlots: eventTemplateSlots,
};
