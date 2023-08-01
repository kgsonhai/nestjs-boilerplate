import { UserRole } from '@/entity/user-role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly repository: Repository<UserRole>,
  ) {}
  async save(
    userRole: Pick<UserRole, 'userId' | 'roleId'>,
    transaction?: QueryRunner,
  ): Promise<UserRole> {
    if (transaction) {
      return await transaction.manager.save(this.repository.create(userRole));
    }
    return this.repository.save(this.repository.create(userRole));
  }
}
