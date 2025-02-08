import { Blob, Entity, ExcludeJSON, Model, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity({ path: 'socials' })
export class Social extends Model {
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
