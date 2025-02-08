import { About } from '@/entities/about/model/About';
import { API, BaseAPI } from '@/shared/lib/storeFactory';

@API(About)
export class AboutAPI extends BaseAPI<About> {}
