import { Gallery } from '@/entities/gallery/model/Gallery';
import { API, BaseAPI } from '@/shared/lib/storeFactory';

@API(Gallery)
export class GalleryAPI extends BaseAPI<Gallery> {}
