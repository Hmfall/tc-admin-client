import type { Partner } from '@/entities/partner/Partner';
import { BaseAPI, Entity, Model, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity()
export class User extends Model {
  static $api = new BaseAPI<Partner>('users');

  @PrimaryKey()
  id: ID;

  login: string;

  email: string;

  isAdmin: boolean;
}
