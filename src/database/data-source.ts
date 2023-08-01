import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

dotenv.config({ path: '.env' });

export const mysqlOrmConfig = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../entity/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  timezone: 'Z',
  dateStrings: true,
  charset: 'utf8mb4',
  logging: ['query', 'error'],
  // synchronize: true,
} as unknown as TypeOrmModuleOptions;

export const dataSource = new DataSource(mysqlOrmConfig as DataSourceOptions);
