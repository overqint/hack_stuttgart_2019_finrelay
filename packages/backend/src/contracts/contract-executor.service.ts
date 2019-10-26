import { Injectable } from '@nestjs/common';

@Injectable()
export class ContractExecutorService {
  execute(contract: any) {
    console.log('[ContractExecutorService] executing contract:', contract);
  }
}
