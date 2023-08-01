import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { mysqlOrmConfig } from '@/database/data-source';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
import { UserModule } from './user/user.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlOrmConfig),
    UserModule,
    AuthModule,
    ReportsModule,
    MediaModule,
  ],
})
export class AppModule {}
