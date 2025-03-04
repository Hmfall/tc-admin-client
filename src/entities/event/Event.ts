import { Type } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';
import { BaseAPI, Entity, Id, Model, PrimaryField } from '@/shared/lib/storeFactory';

@Entity()
export class Event extends Model {
  static $api = new BaseAPI<Event>('events');

  @Id()
  id: ID;

  @PrimaryField()
  name: string;

  description: string;

  details: string;

  @Type(() => ObjectUrl)
  background = new ObjectUrl();

  @Type(() => ObjectUrl)
  logo = new ObjectUrl();
}
