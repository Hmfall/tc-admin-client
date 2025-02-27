import { contactsFormFields } from '@/pages/contacts/domain/form';
import { contactsTemplateSlots } from '@/pages/events/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { Contact } from '@/entities/contact/Contact';
import { useContactStore } from '@/entities/contact/useContactStore';

export const contactsModuleConfig: BaseModuleConfig<Contact> = {
  routeName: 'contacts',
  name: 'Контакты',
  model: Contact,
  store: useContactStore,
  formFields: contactsFormFields,
  templateSlots: contactsTemplateSlots,
};
