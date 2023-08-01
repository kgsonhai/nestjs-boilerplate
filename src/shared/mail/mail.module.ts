import { join } from 'path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailConfig } from '@/config/mail.config';
import { AppLoggerModule } from '../logger/app-logger.module';
import { MailService } from './mail.service';

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
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
