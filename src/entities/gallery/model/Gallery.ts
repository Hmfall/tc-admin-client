import { Blob, Entity, ExcludeJSON, Model, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity({ path: 'gallery' })
export class Gallery extends Model {
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
