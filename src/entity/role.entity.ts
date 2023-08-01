import { BaseModel } from '@/entity/base.entity';
import { RolesType } from '@/shared/enum/role-type';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity()
export class Role extends BaseModel {
  @Column({
    nullable: false,
    // not supported sqllite
    // type: 'enum',
    // enum: RolesType,
    default: RolesType.USER,
  })
  name: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
