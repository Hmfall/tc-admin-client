import { plainToInstance } from 'class-transformer';
import axios from '@/shared/api/axios';
import { BaseAPI, Entity, Id, Model, PrimaryField } from '@/shared/lib/storeFactory';

@Entity()
export class User extends Model {
  static $api = new BaseAPI<User>('users');

  @Id()
  id: ID;

  @PrimaryField()
  login: string;

  email: string;

  newPassword: string;

  get isNotDeletedUser() {
    return this.id === 1;
  }

  async update() {
    return this.updateWithPlain({
      email: this.email,
      login: this.login,
      password: this.newPassword,
    });
  }

  async create() {
    return plainToInstance(
      this.classConstructor,
      await axios.post('auth/signup', {
        email: this.email,
        login: this.login,
        password: this.newPassword,
      }),
    );
  }

  async delete() {
    if (!this.isNotDeletedUser) {
      return await this.$repository.deleteById(this.ID);
    }
  }
}
