import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { AppLogger } from '../logger/app-logger';
import { MailConfig } from '@/config/mail.config';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { MAIL_QUEUE } from '../constant/common';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue(MAIL_QUEUE) private readonly emailQueue: Queue,
    private readonly log: AppLogger,
  ) {}

  async sendEmail(email: string, password: string): Promise<void> {
    await this.emailQueue.add({ email, password });
  }
}
