import { BaseAPI, Entity, Id, Model, PrimaryField } from '@/shared/lib/storeFactory';

@Entity({ singleton: true })
export class About extends Model {
  static $api = new BaseAPI<About>('about');

  @Id()
  id: ID;

  @PrimaryField()
  name: string;

  description: string;
}
