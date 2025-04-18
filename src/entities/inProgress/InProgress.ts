import { Transform } from 'class-transformer';
import { BaseAPI, Entity, Model, PrimaryField } from '@/shared/lib/storeFactory';

@Entity({ singleton: true })
export class InProgress extends Model {
  static $api = new BaseAPI<InProgress>('in-progress');

  @PrimaryField()
  @Transform(({ value }) => !value)
  isAvailable: boolean;

  description: string;
}
