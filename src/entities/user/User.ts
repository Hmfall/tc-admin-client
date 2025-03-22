import { plainToInstance } from 'class-transformer';
import { authAPI } from '@/features/auth/api/AuthAPI';
import { BaseAPI, Entity, Id, Model, PrimaryField } from '@/shared/lib/storeFactory';

@Entity()
export class User extends Model {
  static $api = new BaseAPI<User>('users');

  @Id()
  id: ID;

  @PrimaryField()
  login: string;

  email: string;

  password: string;

  get isNotDeletedUser() {
    return this.id === 1;
  }

  async create() {
    return plainToInstance(
      this.classConstructor,
      await authAPI.signUp({
        email: this.email,
        login: this.login,
        password: this.password,
      }),
    );
  }

  async delete() {
    if (!this.isNotDeletedUser) {
      return await this.$repository.deleteById(this.ID);
    }
  }
}
