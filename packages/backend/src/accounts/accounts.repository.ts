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
        'eyJraWQiOiJyc2ExIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiIxMDAxMDAzNDA1MDAwMDEiLCJhenAiOiJkZXZlbG9wZXJwb3J0YWwiLCJpc3MiOiJodHRwczpcL1wvc2ltdWxhdG9yLWFwaS5kYi5jb21cL2d3XC9vaWRjXC8iLCJleHAiOjE1NzIwODExODYsImlhdCI6MTU3MjA3NzU4NywianRpIjoiNTc0ZjBkYWItOWYwNy00YWI0LWE3YmMtNjY3ZmE5ZTVkNGUxIn0.Q48PrKzhTR0AMFK46yXwwmzWAX5G7FfcKGm8hwpI5bQywGY-tDKw9cHN-Qkp-VGx_oGLVo8dFwx2jnIJZHbg9YIkoYoez4ilbRRIhs9W_loOx1s7hZ2E-V29ytc3rRub1FtajNzz6X17gYVwYbcHSDx7ph96-4_0vDVREY5HBpPz7C5P9qvbkV-BoDr7G9aSS0yBJnKHVwf7Y-HkSRIKillQT4HCA-ta1XHGfQrizXgZdBaMNerG2CqGLCIVYYTdLDIRElX9P8SavFjanuwlF8qBClYBKD3BcrZB8k2hCjM8kH0CHcOsxwkYOV4LClQilx5F61xEkHuE8gdwfHWUXg',
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
}
