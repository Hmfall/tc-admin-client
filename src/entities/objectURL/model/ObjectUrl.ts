import { Exclude } from 'class-transformer';
import { Entity, Model, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity({ path: 'media' })
export class ObjectUrl extends Model {
  @PrimaryKey()
  id: ID;

  url: string;

  @Exclude()
  objectUrl?: string;

  @Exclude()
  file?: File;

  public updateObjectURL(file?: File) {
    if (file) {
      this.objectUrl = URL.createObjectURL(file as Blob);
    } else {
      if (this.objectUrl) {
        URL.revokeObjectURL(this.objectUrl);
        this.objectUrl = this.url;
      }
    }
  }
}
