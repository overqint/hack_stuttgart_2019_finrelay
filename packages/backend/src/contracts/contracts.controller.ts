import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ContractsRepository } from './contracts.repository';
import { ContractExecutorService } from './contract-executor.service';

@Controller('contracts')
export class ContractsController {
  constructor(
    private contractsRepository: ContractsRepository,
    private contractExecutorService: ContractExecutorService,
  ) {}

  @Get(':contractId')
  async findOneById(@Param('contractId') contractId: string) {
    return this.contractsRepository.findOneById(contractId);
  }

  @Get()
  findAll() {
    return this.contractsRepository.findAll();
  }

  @Post(':contractId/execute')
  async executeContractById(
    @Param('contractId') contractId: string,
    @Body() payload,
  ) {
    const contract = await this.contractsRepository.findOneById(contractId);
    this.contractExecutorService.execute(contract, payload);
  }
}
