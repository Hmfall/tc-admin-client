import { Contact } from '@/entities/contact/Contact';
import { storeFactory } from '@/shared/lib/storeFactory';

export const useContactStore = storeFactory(Contact);
