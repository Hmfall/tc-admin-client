import { Type } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/model/ObjectUrl';
import { Entity, Model, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity({ path: 'gallery' })
export class Gallery extends Model {
  @PrimaryKey()
  id: ID;

  name: string;

  description: string;

  link: string;

  @Type(() => ObjectUrl)
  logo = new ObjectUrl();
}
