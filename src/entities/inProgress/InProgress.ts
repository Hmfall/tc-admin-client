import { BaseAPI, Entity, Id, Model, PrimaryField } from '@/shared/lib/storeFactory';

@Entity({ singleton: true })
export class InProgress extends Model {
  static $api = new BaseAPI<InProgress>('in-progress');

  @Id()
  id: ID;

  @PrimaryField()
  isAvailable: boolean;

  description: string;
}
