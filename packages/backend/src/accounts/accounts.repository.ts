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
        'eyJraWQiOiJyc2ExIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiIxMDAxMDAzNDA1MDAwMDEiLCJhenAiOiJkZXZlbG9wZXJwb3J0YWwiLCJpc3MiOiJodHRwczpcL1wvc2ltdWxhdG9yLWFwaS5kYi5jb21cL2d3XC9vaWRjXC8iLCJleHAiOjE1NzIwODQ0MjAsImlhdCI6MTU3MjA4MDgyMSwianRpIjoiNmEzODc5NjItMDkzOS00OTNlLThhN2EtNzY2YWNlZGRlZGE3In0.UhgaWKdg8zbHU2xz_v04sa8ItMhhlDE71u3GNs4zb5dMCsPFpF7tmn1ZxSq2XD9_yXL-SKyvQeKNH5qrNnlcsd5jKrhtVTZZrp7qHYvIaqDHTOXhYjOXI1zhJvedXHjG6v5LTepk-AgBVlN3mh1fe0GuMlvk6ZJbUqJ0OipnPH1mw0w5AzGjRwZQFsgtvmnlnK96N2dJSUKhRpjIZ-2VO7t3t77tMqa6lq6pTiLpCUItznm4L3buwz6ecxyX0scKAvClnRtW-Cel2q3yFpcD3qWmtnDZm9eTNtVeLsGtEE5rj14rhz2PR85uTrEPRV9rYF3GZ4Sm1h1lA7-8-DUppA',
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
