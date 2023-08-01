import { BaseModel } from '@/entity/base.entity';
import { Role } from '@/entity/role.entity';
import { User } from '@/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class UserRole extends BaseModel {
  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'role_id', nullable: false })
  roleId: number;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
