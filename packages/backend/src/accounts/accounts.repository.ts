import { Injectable } from '@nestjs/common';
import * as api from '../deutsche-bank/api-client/transactions';
import { MOCK_TRANSACTIONS } from './mock-transactions.const';
import { TransactionCacheService } from './transaction-cache.service';

/**
 * Repository for Accountss.
 */
@Injectable()
export class AccountsRepository {
  /**
   * Hashmap storing data in-memory.
   */
  private _data = new Map();

  constructor(
    private transactionCacheService: TransactionCacheService
  ) {
    this.save({
      _id: 'SpkTest',
      name: 'SPK-1234',
      type: 'iban-sparkasse',
      linkedAccount: {
        iban: '12345',
      },
    });
    this.save({
      _id: 'DE10010000000000005211',
      name: 'DB-5211',
      type: 'iban-mock',
      linkedAccount: {
        iban: 'DE10010000000000005211',
      },
    });
  }

  /**
   * Find all instances of stored data.
   */
  public async findAll() {
    return Array.from(this._data.values());
  }

  /**
   * Find single instance of data by id.
   * @param id Id of instance to find.
   */
  public async findOneById(id) {
    const instance = this._data.get(id);
    return instance;
  }

  /**
   * Store instance to hashmap.
   * @param instance Instance to store.
   */
  public async save(instance) {
    this._data.set(instance._id, instance);
  }

  async getTransactionsByAccount(account: any) {
    if (!account) throw new Error("Invalid parameter: account");
    if (account.type === 'iban-mock') {
      console.debug('Using iban-mock');
      return MOCK_TRANSACTIONS;
    }
    if (account.type !== 'iban') {
      console.error('Unsupported account type.');
      return [];
    }
    const iban = account.linkedAccount.iban;
    const accessToken = account.linkedAccount.accessToken;
    console.log('Requesting linked account transactions from DB API');
    const client = new api.TransactionsApi({ accessToken });
    const transactions = (await client.getCashAccountTransactions(iban)).data
      .transactions;
    console.log('Got linked account transactions from DB API');
    return transactions;
  }

  async getTransactionsByAccountId(accountId: string) {
    const account = await this.findOneById(accountId);
    let transactions: any[] = await this.getTransactionsByAccount(account);
    if (!transactions) transactions = [];
    const iban = account.linkedAccount.iban;
    transactions = [...this.transactionCacheService.getTransactions(iban), ...transactions].filter(Boolean);
    return transactions;
  }

  async distinctAccountIds() {
    return (await this.findAll()).map(e => e._id);
  }
}
