import { Type } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';
import { BaseAPI, Entity, Model } from '@/shared/lib/storeFactory';

@Entity({ singleton: true })
export class About extends Model {
  static $api = new BaseAPI<About>('about');

  name: string;

  description: string;

  @Type(() => ObjectUrl)
  logo = new ObjectUrl();
}
