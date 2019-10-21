import { Module, OnModuleInit } from '@nestjs/common';
import { DeutscheBankTransactionIngestionService } from './deutsche-bank-transaction-ingestion.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DeutscheBankTransactionIngestionService],
  exports: [DeutscheBankTransactionIngestionService],
})
export class DeutscheBankModule implements OnModuleInit {
  constructor(
    private readonly deutscheBankTransactionIngestionService: DeutscheBankTransactionIngestionService,
  ) {}

  async onModuleInit() {
    await this.deutscheBankTransactionIngestionService.initialize();
  }
}
