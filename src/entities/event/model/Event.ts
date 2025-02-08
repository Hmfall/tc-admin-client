import { Blob, Entity, ExcludeJSON, Model, PrimaryKey } from '@/shared/lib/storeFactory';

@Entity({ path: 'events' })
export class Event extends Model {
  @PrimaryKey()
  id: number;

  name: string;

  description: string;

  details: string;

  @Blob()
  logoImgFile: File;

  @ExcludeJSON()
  logoImg: string;

  @Blob()
  backgroundImgFile: File;

  @ExcludeJSON()
  backgroundImg: string;
}
