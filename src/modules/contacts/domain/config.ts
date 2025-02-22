import type { BaseModuleConfig } from '@/modules/baseModule/model/types';
import { contactsFormFields } from '@/modules/contacts/domain/form';
import { contactsTemplateSlots } from '@/modules/events/domain/template';
import { Contact } from '@/entities/contact/Contact';
import { contactStore } from '@/entities/contact/contactStore';

export const contactsModuleConfig: BaseModuleConfig<Contact> = {
  routeName: 'contacts',
  name: 'Контакты',
  model: Contact,
  store: contactStore,
  formFields: contactsFormFields,
  templateSlots: contactsTemplateSlots,
};
