import { Type } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';
import { BaseAPI, Entity, Model, PrimaryField, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity()
export class Contact extends Model {
  static $api = new BaseAPI<Contact>('contacts');

  @PrimaryKey()
  id: ID;

  @PrimaryField()
  name: string;

  description: string;

  link: string;

  @Type(() => ObjectUrl)
  logo: ObjectUrl = new ObjectUrl();
}
