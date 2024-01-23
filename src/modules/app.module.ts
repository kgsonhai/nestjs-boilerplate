import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { mysqlOrmConfig } from '@/database/data-source';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ExperiencesModule } from './experiences/experiences.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlOrmConfig),
    UserModule,
    AuthModule,
    ExperiencesModule,
    ExperiencesModule,
  ],
})
export class AppModule {}
