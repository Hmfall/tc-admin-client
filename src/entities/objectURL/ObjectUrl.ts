import { ObjectUrlAPI } from '@/entities/objectURL/ObjectUrlAPI';
import { Entity, Id, Model } from '@/shared/lib/storeFactory';

@Entity()
export class ObjectUrl extends Model {
  static $api = new ObjectUrlAPI();

  private _objectUrl: string | null = null;

  private _file: File | null = null;

  @Id()
  id: ID;

  url?: string;

  get objectUrl() {
    return this._objectUrl;
  }

  set objectUrl(value: string | null) {
    this._objectUrl = value;
  }

  get file() {
    return this._file;
  }

  set file(file: File | null) {
    this._file = file;
  }

  updateObjectURL(file?: File | null) {
    if (file) {
      this.objectUrl = URL.createObjectURL(file as Blob);
    } else if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
  }
}
