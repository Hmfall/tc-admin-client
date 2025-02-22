import { Type } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';
import { Entity, Model } from '@/shared/lib/storeFactory';

@Entity({ path: 'about', singleton: true })
export class About extends Model {
  name: string;

  description: string;

  @Type(() => ObjectUrl)
  logo = new ObjectUrl();
}
