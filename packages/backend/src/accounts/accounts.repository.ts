import { Injectable } from '@nestjs/common';
import * as api from '../deutsche-bank/api-client/transactions';

/**
 * Repository for Accountss.
 */
@Injectable()
export class AccountsRepository {
  /**
   * Hashmap storing data in-memory.
   */
  private _data = new Map();

  constructor() {
    const mockData = id => {
      const linkedAccount = {
        iban:
          id === 'DBank1' ? 'DE10010000000000005211' : 'DE10010000000000005250',
      };
      const account = {
        _id: id,
        name: id,
        linkedAccount,
        // Id of linked contracts.
        contracts: ['foo', 'bar'],
      };
      this._data.set(id, account);
    };
    mockData('DBank1');
    mockData('DBank2');
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

  async getTransactionsByAccountId(accountId: string) {
    const importedAccessToken = {
      DE10010000000000005211:
      "eyJraWQiOiJyc2ExIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiIxMDAxMDAzNDA1MDAwMDEiLCJhenAiOiJkZXZlbG9wZXJwb3J0YWwiLCJpc3MiOiJodHRwczpcL1wvc2ltdWxhdG9yLWFwaS5kYi5jb21cL2d3XC9vaWRjXC8iLCJleHAiOjE1NzIwOTY3MTMsImlhdCI6MTU3MjA5MzExNCwianRpIjoiZTEwZTJkMDQtYTk3OC00MjU0LTlkMjQtNjQ3YjliNmY3ZTgxIn0.WeuyogXP8Jcmz-4FhEMo4bZTiBrjyH-A0MEGRRq08aCP-tzSybHHYcoj7RVwdpql2yOd-VUTKW6N-RLqpI0VCDAy-w_R6CE4j9-fdL8vYEB60B-4OCt_BcvELCZryu_jT8xs6fwSAAmO1e8yawwKa9Ha7UNwD6ZMXO6u7RVNwrglX48ar_IPora4GXSduT_vEuuFoUsmYSYHlLB8CKDYW7tIKN5cArYd7znsoaKqjH7G0nOwss1gmv2AiwyGq3FLg1-dNtchPiyYu1vWuABDYwfa-KwPlvqnoyefD4i6Bv8SO1L5hPTAT1g5ENDLCRgSLK6niUJawcV5JiQiNWsbRA",
      DE10010000000000005250: '',
    };
    const account = await this.findOneById(accountId);
    const iban = account.linkedAccount.iban;
    const accessToken = importedAccessToken[iban];
    console.log('Requesting linked account transactions from DB API');
    const client = new api.TransactionsApi({ accessToken });
    const transactions = (await client.getCashAccountTransactions(iban)).data
      .transactions;
    console.log('Got linked account transactions from DB API');
    return transactions;
  }

  async distinctAccountIds() {
    return (await this.findAll()).map(e => e._id);
  }
}
