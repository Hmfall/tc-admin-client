import { plainToInstance } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';
import { API, BaseAPI } from '@/shared/lib/storeFactory';

@API(ObjectUrl)
class ObjectUrlAPI extends BaseAPI<ObjectUrl> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createObjectUrl(file?: File) {
        return plainToInstance(
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

export const objectUrlAPI = new ObjectUrlAPI();
