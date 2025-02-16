import { Contact } from '@/entities/contact/model/Contact';
import { storeFactory } from '@/shared/lib/storeFactory';

export const contactStore = storeFactory({ model: Contact });
