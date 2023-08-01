import { Module } from '@nestjs/common';
import { TokenManagerService } from './token-manager.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [TokenManagerService, JwtService],
  exports: [TokenManagerService],
})
export class TokenManagerModule {}
