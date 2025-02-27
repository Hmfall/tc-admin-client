import { Type } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';
import { BaseAPI, Entity, Model, PrimaryField, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity()
export class Partner extends Model {
  static $api = new BaseAPI<Partner>('partners');

  @PrimaryKey()
  id: ID;

  @PrimaryField()
  name: string;

  description: string;

  link: string;

  @Type(() => ObjectUrl)
  logo = new ObjectUrl();
}
