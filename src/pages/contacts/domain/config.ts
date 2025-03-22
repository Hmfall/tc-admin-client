import { AppRoutes } from '@/app/providers/router/appRoutes';
import { contactFormFields } from '@/pages/contacts/domain/form';
import { contactTemplateSlots } from '@/pages/contacts/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { Contact } from '@/entities/contact/Contact';
import { useContactStore } from '@/entities/contact/useContactStore';

export const contactsModuleConfig: BaseModuleConfig<Contact> = {
  routeName: AppRoutes.Contacts,
  name: 'Контакты',
  model: Contact,
  store: useContactStore,
  formFields: contactFormFields,
  templateSlots: contactTemplateSlots,
};
