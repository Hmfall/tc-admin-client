import { Type } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';
import { BaseAPI, Entity, Id, Model, PrimaryField } from '@/shared/lib/storeFactory';

@Entity()
export class Gallery extends Model {
  static $api = new BaseAPI<Gallery>('gallery');

  @Id()
  id: ID;

  @PrimaryField()
  name: string;

  description: string;

  url: string;

  @Type(() => ObjectUrl)
  logo = new ObjectUrl();

  @Type(() => ObjectUrl)
  background = new ObjectUrl();
}
