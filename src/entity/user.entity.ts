import { Report } from '@/entity/reports.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '@/entity/base.entity';
import { UserRole } from './user-role.entity';
import { Media } from './media.entity';

@Entity()
export class User extends BaseModel {
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @OneToMany(() => Media, (media) => media.user)
  medias: Media[];
}
