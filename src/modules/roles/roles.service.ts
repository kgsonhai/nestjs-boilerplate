import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entity/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async fetchRoles(userId: number): Promise<Role[]> {
    return await this.rolesRepository
      .createQueryBuilder('role')
      .innerJoin('user_role', 'user_role', 'role.id = user_role.role_id')
      .where('user_role.user_id = :userId', { userId })
      .getMany();
  }
}
