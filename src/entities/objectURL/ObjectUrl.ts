import { Exclude } from 'class-transformer';
import { ObjectUrlAPI } from '@/entities/objectURL/ObjectUrlAPI';
import { Entity, Id, Model } from '@/shared/lib/storeFactory';

@Entity()
export class ObjectUrl extends Model {
  static $api = new ObjectUrlAPI();

  @Id()
  id: ID;

  url?: string;

  @Exclude()
  objectUrl?: string | null = null;

  @Exclude()
  file?: File;

  updateObjectURL(file?: File) {
    if (file) {
      this.objectUrl = URL.createObjectURL(file as Blob);
    } else if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
  }
}
