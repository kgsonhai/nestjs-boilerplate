import { BaseModel } from '@/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity()
export class User extends BaseModel {
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
