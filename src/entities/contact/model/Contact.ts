import { Blob, Entity, ExcludeJSON, Model, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity({ path: 'contacts' })
export class Contact extends Model {
  @PrimaryKey()
  id: number;

  name: string;

  description: string;

  link: string;

  @Blob()
  logoImgFile: File;

  @ExcludeJSON()
  logoImg: string;
}
