import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeutscheBankModule } from './deutsche-bank/deutsche-bank.module';
import { TransactionProcessorModule } from './transaction-processor/transaction-processor.module';
import { N8NWrapperModule } from './n8n-wrapper/n8n-wrapper.module';

@Module({
  imports: [DeutscheBankModule, N8NWrapperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
