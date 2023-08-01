import path from 'path';
import { Injectable, Scope } from '@nestjs/common';
import { format, Logger, createLogger, transports } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger {
  private context: string;
  private logger: Logger;

  public setContext(context: string): void {
    this.context = context;
  }

  constructor() {
    const { combine, timestamp, json, colorize } = format;
    const dirname = process.env.LOG_DIR;

    this.logger = createLogger({
      format: combine(
        timestamp({ format: 'isoDateTime' }),
        json(),
        colorize({ all: true }),
      ),
      transports: [
        new transports.File({
          dirname,
          filename: 'error.log',
          level: 'error',
        }),
        new transports.File({
          dirname,
          filename: 'combined.log',
        }),
        new transports.Console({
          level: 'info',
        }),
      ],
    });
  }

  getFormat(context: string, object: any) {
    const contextFormat = context ? `${context}: ` : '';
    const objectFormat = object ? JSON.stringify(object) : '';
    return { contextFormat, objectFormat };
  }

  info(message: string, object?: any) {
    const { contextFormat, objectFormat } = this.getFormat(
      this.context,
      object,
    );
    return this.logger.info(`${contextFormat}${message}${objectFormat}`);
  }

  error(message: string, object?: any) {
    const { contextFormat, objectFormat } = this.getFormat(
      this.context,
      object,
    );
    return this.logger.error(`${contextFormat}${message}${objectFormat}`);
  }
}
