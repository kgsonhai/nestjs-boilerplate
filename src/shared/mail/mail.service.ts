import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { AppLogger } from '../logger/app-logger';
import { MailConfig } from '@/config/mail.config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly log: AppLogger,
  ) {}

  async sendEmail(email: string, password: string): Promise<void> {
    try {
      await this.mailService.sendMail({
        to: email,
        from: MailConfig.from,
        subject: 'Create account successfully',
        template: './account-login',
        context: { password, email },
      });
      this.log.info(`Email has been sent to ${email} successfully`);
    } catch (error) {
      this.log.error(
        `Email has not been sent to ${email} failed with error #`,
        error,
      );
    }
  }
}
