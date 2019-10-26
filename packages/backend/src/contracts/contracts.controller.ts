import { Controller, Get, Param, Post } from '@nestjs/common';
import { ContractsRepository } from './contracts.repository';

@Controller('contracts')
export class ContractsController {
  constructor(private contractsRepository: ContractsRepository) {}

  @Get(':contractId')
  async findOneById(@Param('contractId') contractId: string) {
    return this.contractsRepository.findOneById(contractId);
  }

  @Get()
  findAll() {
    return this.contractsRepository.findAll();
  }

  @Post(':contractId/execute')
  async executeContractById(@Param('contractId') contractId: string) {
    const contract = this.contractsRepository.findOneById(contractId);
    console.log('executing contract:', contract);
  }
}
