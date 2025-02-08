import { Blob, Entity, ExcludeJSON, Model } from '@/shared/lib/storeFactory';

@Entity({ path: 'about', singleton: true })
export class About extends Model {
  name: string;

  description: string;

  @Blob()
  logoImgFile: File;

  @ExcludeJSON()
  logoImg: string;
}

export const about = new About();

