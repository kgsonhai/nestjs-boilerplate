import { Module } from '@nestjs/common';
import { TransactionManager } from './transaction';

@Module({
  providers: [TransactionManager],
  exports: [TransactionManager],
})
export class TransactionModule {}
