import { Role } from '@/entity/role.entity';
import { UserRole } from '@/entity/user-role.entity';
import { User } from '@/entity/user.entity';
import { RolesType } from '@/shared/enum/role-type';
import { MigrationInterface, QueryRunner } from 'typeorm';
export class InitData1691640338214 implements MigrationInterface {
  name = 'InitData1691640338214';

  public async up(_: QueryRunner): Promise<void> {
    // init table role
    const adminRole = { id: 1, name: RolesType.ADMIN };
    const organizationRole = { id: 2, name: RolesType.ORGANIZATION };
    const userRole = { id: 3, name: RolesType.USER };
    await Role.getRepository().save(adminRole);
    await Role.getRepository().save(organizationRole);
    await Role.getRepository().save(userRole);

    //init table user
    const user = {
      id: 1,
      email: 'user1@gmail.com',
      password: '$2b$10$rhluMJk6CiMoU5G7MF4ReOPOGC/peR65RUZglXvMx9Fru/3/KyJMy',
    };
    await User.getRepository().save(user);

    //init table user_role
    const userRole1 = { id: 1, userId: 1, roleId: 3 };
    await UserRole.getRepository().save(userRole1);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
