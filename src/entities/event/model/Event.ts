import { Type } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/model/ObjectUrl';
import { Entity, Model, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity({ path: 'events' })
export class Event extends Model {
  @PrimaryKey()
  id: number;

  name: string;

  description: string;

  details: string;

  @Type(() => ObjectUrl)
  background: ObjectUrl;

  @Type(() => ObjectUrl)
  logo: ObjectUrl;
}
