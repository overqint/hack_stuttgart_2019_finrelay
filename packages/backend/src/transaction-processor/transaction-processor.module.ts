import { Module } from '@nestjs/common';
import { TransactionProcessorService } from './transaction-processor.service';
import { DeutscheBankModule } from '../deutsche-bank/deutsche-bank.module';

@Module({
  providers: [TransactionProcessorService],
  imports: [DeutscheBankModule],
})
export class TransactionProcessorModule {}
