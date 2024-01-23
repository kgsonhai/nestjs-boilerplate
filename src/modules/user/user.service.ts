import { AppLogger } from '@/shared/logger/app-logger';
import { TransactionManager } from '@/shared/transaction/transaction';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { UserRoleService } from '../user-role/user-role.service';
import { RedisService } from '@/shared/redis/redis.service';
import { redisKeys } from '@/shared/constant/redis-keys';
import { MailService } from '@/shared/mail/mail.service';
import { CreateUserDto } from './dto/req/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly log: AppLogger,
    private readonly userRoleService: UserRoleService,
    private readonly transactionManager: TransactionManager,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
    @InjectRepository(User) private repository: Repository<User>,
  ) {}

  async createUser(user: Partial<CreateUserDto>) {
    const transaction = await this.transactionManager.create();
    try {
      this.log.info('Save user to DB', user);

      const newUser = await transaction.manager.save(
        this.repository.create(user),
      );

      const roles = [1, 3];
      for (const role of roles) {
        await this.userRoleService.save(
          { userId: newUser.id, roleId: role },
          transaction,
        );
      }
      await this.mailService.sendEmail(user.email, user.password);
      await this.transactionManager.commit(transaction);
      return newUser.id;
    } catch (error) {
      await this.transactionManager.rollback(transaction, error);
    }
  }

  getListUser(): Promise<User[]> {
    return this.repository.find();
  }

  async getUserById(id: number): Promise<User> {
    this.log.info('get userId -', id);

    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getUsersWithRole(): Promise<User[]> {
    const usersFromRedisData = await this.redisService.getValue(
      redisKeys.USERS_WITH_ROLES,
    );
    if (usersFromRedisData) return usersFromRedisData;

    const users = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRoles', 'userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .select(['user.id', 'user.email', 'userRole.roleId', 'role.name'])
      .getMany();
    await this.redisService.setValue(
      redisKeys.USERS_WITH_ROLES,
      users,
      60 * 30,
    );
    return users || [];
  }

  async getUserByEmail(email: string): Promise<Partial<User>> {
    const user = await this.repository.findOneBy({ email });
    return user || {};
  }

  async updateUser(idUser: number, body: Partial<User>): Promise<User> {
    const { email, password } = body;
    const user = await this.getUserById(idUser);
    if (!user) throw new NotFoundException('User not found');
    if (email) user.email = email;
    if (password) user.password = password;
    return this.repository.save(user);
  }
}
