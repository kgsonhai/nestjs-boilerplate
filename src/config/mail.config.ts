import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const MailConfig = {
  host: process.env.MAIL_HOST,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
  from: process.env.MAIL_FROM,
};
