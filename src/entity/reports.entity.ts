import { User } from '@/entity/user.entity';
import { BaseModel } from '@/entity/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Report extends BaseModel {
  @Column()
  name: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
