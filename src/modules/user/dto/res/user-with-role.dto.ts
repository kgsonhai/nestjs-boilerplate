import { Expose, Transform, Type } from 'class-transformer';

export class UserRoleDto {
  @Expose()
  @Transform(({ value }) => Number(value))
  roleId: number;

  @Expose()
  role: any;
}

export class UserWithRoleDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  @Type(() => UserRoleDto)
  userRoles: UserRoleDto[];
}
