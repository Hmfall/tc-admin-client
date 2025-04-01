import { Expose, Type } from 'class-transformer';
import type { EventPosition } from '@/entities/event/model/types';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';
import { BaseAPI, Entity, Id, Model, PrimaryField } from '@/shared/lib/storeFactory';

@Entity()
export class Event extends Model {
  static $api = new BaseAPI<Event>('event');

  @Id()
  id: ID;

  @PrimaryField()
  name: string;

  @Expose({ name: 'shortDescription' })
  description: string;

  @Expose({ name: 'longDescription' })
  details: string;

  position: EventPosition;

  @Type(() => ObjectUrl)
  logo = new ObjectUrl();

  @Type(() => ObjectUrl)
  img = new ObjectUrl();
}
