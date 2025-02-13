import { Type } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/model/ObjectUrl';
import { Entity, Model, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity({ path: 'partners' })
export class Partner extends Model {
  @PrimaryKey()
  id: number;

  name: string;

  description: string;

  link: string;

  @Type(() => ObjectUrl)
  logo: ObjectUrl;
}
