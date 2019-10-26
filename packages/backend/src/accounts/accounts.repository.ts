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
        contracts: [],
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
        'eyJraWQiOiJyc2ExIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiIxMDAxMDAzNDA1MDAwMDEiLCJhenAiOiJkZXZlbG9wZXJwb3J0YWwiLCJpc3MiOiJodHRwczpcL1wvc2ltdWxhdG9yLWFwaS5kYi5jb21cL2d3XC9vaWRjXC8iLCJleHAiOjE1NzIwNzc0MDgsImlhdCI6MTU3MjA3MzgwOCwianRpIjoiMzIyNjFhN2EtYmJhZC00MmQ5LTg4NTItMGJkY2RlNTA4ZjI3In0.hnl-IL6ugdVIfY7GGsut5XQ-SmpBzT5sMIT1_WrUHGJZ0cAPMYJIHVbfrM1IxUOqxzLnOclYJqGB_pHStu-WPxtQ34qkGbtXxyEw8AxR7GiYv18H0ZD2eGSLy1TxcNzc2yJrMFB1VkwcEmZCDbPl-2HNEwTrxixc35CRsgAzDneSR1VP-tFnZqm1CqV4Hs76NA0CYbXqxJD8xP_c6GALr4CnRM6hP_Ny5x_nM_BNt5GxxHdivDx6Rg5QLA22JfDofS3pGB28LiLD8f2RrfuelwnxVEXtIVa_nvc8oCO8Sa2JcsH_Glpat78M4DlKFJOw_y-pPBG0fKwJydVV30Wf-w',
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
