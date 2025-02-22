import { Type } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';
import { Entity, Model, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity({ path: 'events' })
export class Event extends Model {
  @PrimaryKey()
  id: ID;

  name: string;

  description: string;

  details: string;

  @Type(() => ObjectUrl)
  background = new ObjectUrl();

  @Type(() => ObjectUrl)
  logo = new ObjectUrl();
}
