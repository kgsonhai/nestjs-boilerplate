import { join } from 'path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailConfig } from '@/config/mail.config';
import { AppLoggerModule } from '../logger/app-logger.module';
import { MailService } from './mail.service';
import { BullModule } from '@nestjs/bull';
import { MAIL_QUEUE } from '../constant/common';
import { ApplicationConfig } from '@/config/application.config';

@Module({
  imports: [
    AppLoggerModule,
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: MailConfig.host,
          auth: {
            user: MailConfig.user,
            pass: MailConfig.pass,
          },
          secure: false,
        },
        template: {
          dir: join(__dirname, 'template'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: ApplicationConfig.redis.host,
        port: ApplicationConfig.redis.port,
      },
    }),
    BullModule.registerQueue({
      name: MAIL_QUEUE,
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
