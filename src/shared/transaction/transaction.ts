import { QueryRunner } from 'typeorm/query-runner/QueryRunner';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionManager {
  private readonly context: string;

  constructor(private readonly dataSource: DataSource) {
    this.context = TransactionManager.name;
  }

  async create(): Promise<QueryRunner> {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.startTransaction();
    return queryRunner;
  }

  async commit(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.commitTransaction();
  }

  async rollback(queryRunner: QueryRunner, error: any): Promise<void> {
    await queryRunner.rollbackTransaction();
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }
}
