import { Blob, Entity, ExcludeJSON, Model, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity({ path: 'partners' })
export class Partner extends Model {
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
