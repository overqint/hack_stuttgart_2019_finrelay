import { Injectable } from '@nestjs/common';
import { N8NWrapperService } from '../n8n-wrapper/n8n-wrapper.service';
import { InputPlaceholderRepository } from '../n8n-wrapper/input-placeholder.repository';
import { AccountsRepository } from '../accounts/accounts.repository';
import { ContractsRepository } from './contracts.repository';
import { WorkflowFromContractFactoryService } from './workflow-from-contract-factory.service';

@Injectable()
export class ContractExecutorService {
  constructor(
    private n8nWrapperService: N8NWrapperService,
    private inputPlaceholderRepository: InputPlaceholderRepository,
    private accountsRepository: AccountsRepository,
    private contractsRepository: ContractsRepository,
    private workflowFromContractFactoryService: WorkflowFromContractFactoryService,
  ) {}

  async execute(contract: any, payload: any) {
    console.log(
      '[ContractExecutorService] executing contract:',
      contract,
      payload,
    );
    const transactions = await this.resolveTransactionsForPayload(payload);
    const inputPlaceholder = Date.now().toString();
    const resolvedPlaceholder = {
      _id: inputPlaceholder,
      contract,
      transactions,
    };
    this.inputPlaceholderRepository.save(resolvedPlaceholder);
    const workflowData: any = await this.workflowFromContractFactoryService.createWorkflow(
      contract,
      inputPlaceholder,
    );
    try {
      const result = await this.n8nWrapperService.runWorkflow(workflowData);
      console.log(
        'n8nWrapperService result',
        JSON.stringify(result.data.resultData.runData.Function1, null, 2),
      );
    } catch (err) {
      const rethrownErr: Error | any = new Error('Error executing workflow.');
      rethrownErr.cause = err;
      console.error(rethrownErr);
    }
  }
  async resolveTransactionsForPayload(payload: any) {
    let transactions = [];
    if (!payload.accounts) {
      payload.accounts = '*';
    }
    if (payload.accounts === '*') {
      payload.accounts = await this.accountsRepository.distinctAccountIds();
    }
    for (const accountId of payload.accounts) {
      try {
        const accountTransactions = await this.accountsRepository.getTransactionsByAccountId(
          accountId,
        );
        transactions = [...transactions, ...accountTransactions];
      } catch (err) {
        console.warn(`Could not get transactions for account ${accountId}.`);
        continue;
      }
    }
    console.log('transactions:', transactions);
    return transactions;
  }

  async executeContractsForAccount(account: any) {
    console.log('executeContractsForAccount');
    const contracts = account.contracts;
    for (const contractId of contracts) {
      console.log('contract:', contractId);
      const contract = await this.contractsRepository.findOneById(contractId);
      await this.execute(contract, { accounts: [account._id] });
    }
  }
}
