import { Entity, Model, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity({ path: 'users' })
export class User extends Model {
  @PrimaryKey()
  id: ID;

  login: string;

  email: string;
}
