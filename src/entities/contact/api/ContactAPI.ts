import { Contact } from '@/entities/contact/model/Contact';
import { API, BaseAPI } from '@/shared/lib/storeFactory';

@API(Contact)
export class ContactAPI extends BaseAPI<Contact> {}
