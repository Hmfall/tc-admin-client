import { ObjectUrl } from '@/entities/objectURL/model/ObjectUrl';
import { API, BaseAPI, toModel } from '@/shared/lib/storeFactory';

@API(ObjectUrl)
export class ObjectUrlAPI extends BaseAPI<ObjectUrl> {
  async createObjectUrl(file?: File) {
    return toModel(
      ObjectUrl,
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            id: new Date(),
            url: '',
          });
        }, 2000),
      ),
    );
  }
}
