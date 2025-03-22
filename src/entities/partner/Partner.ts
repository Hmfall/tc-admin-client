import { Type } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';
import { BaseAPI, Entity, Id, Model, PrimaryField } from '@/shared/lib/storeFactory';

@Entity()
export class Partner extends Model {
  static $api = new BaseAPI<Partner>('partners');

  @Id()
  id: ID;

  @PrimaryField()
  name: string;

  description: string;

  url: string;

  @Type(() => ObjectUrl)
  logo = new ObjectUrl();
}
