import { Exclude } from 'class-transformer';
import { Model, PrimaryKey } from '@/shared/lib/storeFactory';

export class ObjectUrl extends Model {
  @PrimaryKey()
  id: ID;

  url: string;

  @Exclude()
  objectURL?: string;

  @Exclude()
  file?: File;

  public updateObjectURL(file?: File) {
    if (file) {
      this.objectURL = URL.createObjectURL(file as Blob);
    } else {
      if (this.objectURL) {
        URL.revokeObjectURL(this.objectURL);
        this.objectURL = this.url;
      }
    }
  }
}
