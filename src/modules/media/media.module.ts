import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { AppLoggerModule } from '@/shared/logger/app-logger.module';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from '@/entity/media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Media]), AppLoggerModule],
  providers: [MediaService],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaModule {}
