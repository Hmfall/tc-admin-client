import { BaseAPI, Entity, Id, Model, PrimaryField } from '@/shared/lib/storeFactory';

@Entity()
export class User extends Model {
  static $api = new BaseAPI<User>('users');

  @Id()
  id: ID;

  @PrimaryField()
  login: string;

  email: string;

  isAdmin: boolean;
}
