import { BaseAPI, Entity, Model, PrimaryField, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity()
export class User extends Model {
  static $api = new BaseAPI<User>('users');

  @PrimaryKey()
  id: ID;

  @PrimaryField()
  login: string;

  email: string;

  isAdmin: boolean;
}
