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
    //payload.accounts = contract.accounts;
    let transactions = await this.resolveTransactionsForPayload(payload);
    transactions = transactions.filter(transaction =>
      this.filterExecutableTransactions(transaction, contract.conditions),
    );
    console.log('transactions.length:', transactions.length);
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
  filterExecutableTransactions(transaction: any, conditions: any) {
    for (const condition of conditions) {
      console.log(condition);
      if (condition.type === 'account-iban-equals') {
        if (transaction.originIban !== condition.data.iban) { return false; }
      }
      if (condition.type === 'counter-party-name-contains') {
        if (transaction.counterPartyName.toLowerCase().indexOf(condition.data.counterPartyName.toLowerCase()) < 0) { return false; }
      }
      if (condition.type === 'check-amount') {
        switch (condition.data.operation) {
          case 'eq':
            if (transaction.amount !== condition.data.amount) { return false; }
            break;
          case 'lt':
            if (transaction.amount >= condition.data.amount) { return false; }
            break;
          case 'gt':
            if (transaction.amount < condition.data.amount) { return false; }
            break;
        }
      }
    }
    return true;
  }
  async resolveTransactionsForPayload(payload: any) {
    let transactions = [];
    if (!payload.accounts) {
      payload.accounts = '*';
    }
    if (payload.accounts === '*') {
      payload.accounts = await this.accountsRepository.distinctAccountIds();
    }
    console.log('Resolving transacctions.', payload.accounts);
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
    // console.log('transactions:', transactions);
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
