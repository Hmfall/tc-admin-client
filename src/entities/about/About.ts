import { BaseAPI, Entity, Model, PrimaryField } from '@/shared/lib/storeFactory';

@Entity({ singleton: true })
export class About extends Model {
  static $api = new BaseAPI<About>('about');

  @PrimaryField()
  name: string;

  description: string;
}
