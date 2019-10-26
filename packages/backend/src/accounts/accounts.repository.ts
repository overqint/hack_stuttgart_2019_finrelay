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
        'eyJraWQiOiJyc2ExIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiIxMDAxMDAzNDA1MDAwMDEiLCJhenAiOiJkZXZlbG9wZXJwb3J0YWwiLCJpc3MiOiJodHRwczpcL1wvc2ltdWxhdG9yLWFwaS5kYi5jb21cL2d3XC9vaWRjXC8iLCJleHAiOjE1NzIwODgyNTIsImlhdCI6MTU3MjA4NDY1MywianRpIjoiNzdlMmY2MDgtMzU3YS00YjNlLWFjYTUtNTNjZDIzYWExYWVkIn0.kR_2_4DDuBsxJmlvjKnzan4eV8H7raDRdx-f--u2WsOUleGKgrniZzwMgYpQWXB7o_AUazEg85IyVuTKYNbQbhF38gPRRuW9fCiLzIvGEFEZMdKR7GTNNQB_D2F0stApPOBaPx-xbGuEfkLh6PPtFUjzFD-8rkjWTv18mUHRQRWJ9oRcCr2pa9pLopUox1f1JegbN8r9KQwb7WYFnYd5W61P51F1XSo2JzqSl23ZUVH4kGzzg_XQ-82wG9PjQ7cO5h8XVfe6SLXshVW0C1hTrPW8HlxS5TonYXypMq05YIQwpyFZPGIADgWlJmAnPTgcdT1ssnms2oss1XwU9rZuaA',
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
