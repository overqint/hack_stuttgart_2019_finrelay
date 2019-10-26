import { Controller, Get, Param } from '@nestjs/common';
import { ContractsRepository } from './contracts.repository';

@Controller('contracts')
export class ContractsController {
  constructor(private contractsRepository: ContractsRepository) {}

  @Get(':contractId')
  async findOneById(@Param('contractId') contractId: string) {
    return this.contractsRepository.findOneById(contractId);
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
}
