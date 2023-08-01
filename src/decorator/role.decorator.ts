import { RolesType } from '@/shared/enum/role-type';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';
export const Roles = (...roles: RolesType[]): any =>
  SetMetadata(ROLE_KEY, roles);
