import { Process, Processor } from '@nestjs/bull';
import { MAIL_QUEUE } from '../constant/common';
import { AppLogger } from '../logger/app-logger';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';

@Processor(MAIL_QUEUE)
export class MailProcessor {
  constructor(
    private readonly logger: AppLogger,
    private readonly mailerService: MailerService,
  ) {
    this.logger.setContext(MailProcessor.name);
  }

  @Process(MAIL_QUEUE)
  async sendNotificationEmail(job: Job<unknown>): Promise<void> {
    console.log({ job });
    // try {
    //   await this.mailService.sendMail({
    //     to: email,
    //     from: MailConfig.from,
    //     subject: 'Create account successfully',
    //     template: './account-login',
    //     context: { password, email },
    //   });
    //   this.log.info(`Email has been sent to ${email} successfully`);
    // } catch (error) {
    //   this.log.error(
    //     `Email has not been sent to ${email} failed with error #`,
    //     error,
    //   );
    // }
  }
}
