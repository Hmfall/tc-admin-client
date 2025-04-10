import { Type } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';
import { BaseAPI, Entity, Id, Model, PrimaryField } from '@/shared/lib/storeFactory';

@Entity()
export class Contact extends Model {
  static $api = new BaseAPI<Contact>('contact');

  @Id()
  id: ID;

  @PrimaryField()
  name: string;

  description: string;

  url: string;

  @Type(() => ObjectUrl)
  logo = new ObjectUrl();
}
