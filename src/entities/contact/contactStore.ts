import { storeAdapter } from '@/app/providers/store/utils';
import { Contact } from '@/entities/contact/Contact';
import { storeFactory } from '@/shared/lib/storeFactory';

export const contactStore = storeAdapter(storeFactory({ model: Contact }));
