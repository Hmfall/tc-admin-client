import { plainToInstance } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';
import { API, BaseAPI } from '@/shared/lib/storeFactory';

@API('media')
export class ObjectUrlAPI extends BaseAPI<ObjectUrl> {
  async createObjectUrl(formData?: FormData) {
    const response = await this.api.post('/save', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return plainToInstance(ObjectUrl, response);
  }
}
