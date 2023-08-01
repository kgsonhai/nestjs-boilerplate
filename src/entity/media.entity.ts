import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseModel } from './base.entity';

@Entity()
export class Media extends BaseModel {
  @Column()
  key: string;

  @Column()
  name: string;

  @Column()
  file_name: string;

  @Column()
  mime_type: String;

  @Column()
  size: number;

  @ManyToOne(() => User, (user: User) => user.medias)
  user: User;
}
