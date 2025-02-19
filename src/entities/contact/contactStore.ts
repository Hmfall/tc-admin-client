import { Contact } from '@/entities/contact/Contact';
import { storeFactory } from '@/shared/lib/storeFactory';

export const contactStore = storeFactory({ model: Contact });
