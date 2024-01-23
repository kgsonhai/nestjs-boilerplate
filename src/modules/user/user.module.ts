import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { CurrentUserInterceptor } from './interceptor/current-user.intecepror';
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { UserRoleModule } from '../user-role/user-role.module';
import { TransactionModule } from '@/shared/transaction/transaction.module';
import { AppLoggerModule } from '@/shared/logger/app-logger.module';
import { RedisModule } from '@/shared/redis/redis.module';
import { MailModule } from '@/shared/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserRoleModule,
    TransactionModule,
    AppLoggerModule,
    RedisModule,
    MailModule,
  ],
  controllers: [UserController],
  providers: [
    Reflector,
    UserService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
  exports: [UserService],
})
export class UserModule {}
