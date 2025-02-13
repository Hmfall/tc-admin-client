import { Type } from 'class-transformer';
import { ObjectUrl } from '@/entities/objectURL/model/ObjectUrl';
import { Entity, Model, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity({ path: 'contacts' })
export class Contact extends Model {
  @PrimaryKey()
  id: number;

  name: string;

  description: string;

  link: string;

  @Type(() => ObjectUrl)
  logo: ObjectUrl;
}
