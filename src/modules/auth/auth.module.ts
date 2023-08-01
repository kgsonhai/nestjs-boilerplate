import { UserModule } from '@/modules/user/user.module';
import { JwtStrategy } from '@/shared/strategy/jwt.strategy';
import { TokenManagerModule } from '@/shared/token-manager/token-manager.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from '../roles/roles.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RedisModule } from '@/shared/redis/redis.module';
import { MailModule } from '@/shared/mail/mail.module';

@Module({
  imports: [
    UserModule,
    TokenManagerModule,
    PassportModule,
    RolesModule,
    RedisModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
