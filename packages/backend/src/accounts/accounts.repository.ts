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
      "eyJraWQiOiJyc2ExIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiIxMDAxMDAzNDA1MDAwMDEiLCJhenAiOiJkZXZlbG9wZXJwb3J0YWwiLCJpc3MiOiJodHRwczpcL1wvc2ltdWxhdG9yLWFwaS5kYi5jb21cL2d3XC9vaWRjXC8iLCJleHAiOjE1NzIxMDA2OTcsImlhdCI6MTU3MjA5NzA5NywianRpIjoiZDg3ZWI3MTAtMmE2Mi00OThlLTgwYTgtNWI4ZmIzZjIzY2Q2In0.Vz574Zop32mpK81GeGRH5udfgbcUbtlM2GQOqNA1scmqotBiqtuzFDMfScq0Fu_ZqHv9YrOmfpLHhYiqNSH5fR1g1G4VM_lAxSoX3kjBg5RL3DmaFO0mE1VAYY97GlXu9D5kXNMNohc0IoFs9wcVmufWpdcMCnOJ070HiUhexnkWcLjmvbn2-dljlATLxlJdw5S4s495gT3dbjygFwtBAf64xqFNmXEz5Lm5Gkha0gG09dS6GYzp8PFas6Ee6V6wmBdn8chG-W1kcqYe9fOXJ9LApnFIL3TCJi0i1tDnhU8HnGcqVWKSXc9c6di8-Q_vJFnPPOVyXDc_5qxs7lSGjQ",
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
