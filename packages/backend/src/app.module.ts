import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeutscheBankModule } from './deutsche-bank/deutsche-bank.module';
import { TransactionProcessorModule } from './transaction-processor/transaction-processor.module';
import { N8NWrapperModule } from './n8n-wrapper/n8n-wrapper.module';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsRepository } from './accounts/accounts.repository';
import { ContractsController } from './contracts/contracts.controller';
import { ContractsRepository } from './contracts/contracts.repository';

@Module({
  imports: [DeutscheBankModule, N8NWrapperModule],
  controllers: [AppController, AccountsController, ContractsController],
  providers: [AppService, AccountsRepository, ContractsRepository],
})
export class AppModule {}
