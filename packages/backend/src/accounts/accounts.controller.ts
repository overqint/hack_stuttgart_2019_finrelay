import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { ContractExecutorService } from '../contracts/contract-executor.service';

@Controller('accounts')
export class AccountsController {
  constructor(
    private accountsRepository: AccountsRepository,
    private contractExecutorService: ContractExecutorService,
  ) {}

  @Get(':accountId')
  async findOneById(@Param('accountId') accountId: string) {
    return this.accountsRepository.findOneById(accountId);
  }

  @Get()
  findAll() {
    return this.accountsRepository.findAll();
  }

  @Get(':accountId/transactions')
  async getTransactionsByAccountId(@Param('accountId') accountId: string) {
    return this.accountsRepository.getTransactionsByAccountId(accountId);
  }

  @Post(':accountId/contracts')
  async setContracts(@Param('accountId') accountId: string, @Body() payload) {
    const account = await this.accountsRepository.findOneById(accountId);
    account.contracts = payload.contracts;
    await this.accountsRepository.save(account);
  }

  @Post()
  async createAccount(@Body() payload) {
    if (!payload._id) payload._id = Date.now().toString();
    await this.accountsRepository.save(payload);
    return payload;
  }
}
