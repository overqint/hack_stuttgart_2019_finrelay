import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
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

  @Post(':contractId')
  async updateOneById(
    @Param('contractId') contractId: string,
    @Body() contract,
  ) {
    return this.contractsRepository.save(contract);
  }

  @Post(':contractId/execute')
  async executeContractById(
    @Param('contractId') contractId: string,
    @Body() payload,
  ) {
    const contract = await this.contractsRepository.findOneById(contractId);
    this.contractExecutorService.execute(contract, payload);
  }

  @Delete(':contractId/delete')
  async deleteOneById(
    @Param('contractId') contractId: string) {
      console.log("delete contract : "+contractId);
     return this.contractsRepository.delete(contractId);  
    
  }

  @Post()
  async createContract(@Body() payload) {
    if (!payload._id) payload._id = Date.now().toString();
    await this.contractsRepository.save(payload);
    return payload;
  }
}
