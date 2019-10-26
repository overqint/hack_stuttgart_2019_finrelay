import { Controller, Get, Param } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsRepository: AccountsRepository) {}

  @Get(':accountId')
  async findOneById(@Param('accountId') accountId: string) {
    return this.accountsRepository.findOneById(accountId);
  }

  @Get()
  findAll(): any[] | PromiseLike<any[]> {
    return [
      {
        id: 'DBank1',
        name: 'Deutsche Bank TEST',
        type: 'iban',
      },
    ];
  }

  @Get(':accountId/transactions')
  async getTransactionsByAccountId(@Param('accountId') accountId: string) {
    return this.accountsRepository.getTransactionsByAccountId(accountId);
  }
}
