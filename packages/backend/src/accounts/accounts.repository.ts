import { Injectable } from '@nestjs/common';
import * as api from '../deutsche-bank/api-client/transactions';

@Injectable()
export class AccountsRepository {
  async findById(accountId: string) {
    return {
      _id: accountId,
      name: accountId,
      iban:
        accountId === 'DBank1'
          ? 'DE10010000000000005211'
          : 'DE10010000000000005250',
    };
  }

  async getTransactionsByAccountId(accountId: string) {
    const importedAccessToken = {
      DE10010000000000005211:
        'eyJraWQiOiJyc2ExIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiIxMDAxMDAzNDA1MDAwMDEiLCJhenAiOiJkZXZlbG9wZXJwb3J0YWwiLCJpc3MiOiJodHRwczpcL1wvc2ltdWxhdG9yLWFwaS5kYi5jb21cL2d3XC9vaWRjXC8iLCJleHAiOjE1NzIwNDc1NTAsImlhdCI6MTU3MjA0Mzk1MCwianRpIjoiNjg1MDgwZDQtZmE5ZC00YWU0LWJiZGItNjI3NjY2MGEzOGQwIn0.Bf8EgmF2Zf_T8SSpJX4bSab_oSbpr87NyTSUgV9wpWoOK6oiKhF89UeMNGOTxL_yItZtop4uWbtUshZSfYh5P6N33ZpaZgQmoysQMdb5LUmJ9IFTyMtxHDtkOTix1X5_Sn0QIhYGkf6vh05JnD3USfkSVDH8TKPZPm2qB-NNCXwMLtCJo1Ese_vxT9GH_BihavqISuuz9q1Bs5rauJ3tsh0kHIU9vWf0bR2fs2BnLZlY-MBRkidfJf2dE7_-1Ug3iEBQYrXPOAiFTvXlr62Y7IF8eXuXiyxzSmc4OZ0hszuLAH5u1cmnt61wUeHQ8wWPF9p9cLXzLYlxdR0RwRibSA',
      DE10010000000000005250:
        'eyJraWQiOiJyc2ExIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiIxMDAxMDAzNTMzMDAwMDEiLCJhenAiOiJkZXZlbG9wZXJwb3J0YWwiLCJpc3MiOiJodHRwczpcL1wvc2ltdWxhdG9yLWFwaS5kYi5jb21cL2d3XC9vaWRjXC8iLCJleHAiOjE1NzIwNDg2NTgsImlhdCI6MTU3MjA0NTA1OCwianRpIjoiNWYwZTVkNjQtMTRlMS00MWRlLThmMzEtZDY3YjZjYzY2NzJjIn0.C2EOGOrgq2zCK_HxDUr_wl2RWRzHFYAdm-j14GXe-RE0VPQKqHQ7R5EHLTm7fpCAROfa7cNxLo_rK_YJL0MSxXeQDrlyLmiP9ozD6k-RTsXP3TSn887OKmaHWV8ZZt5eog8ZR9LVf4Eb70SGvuXX4BKBZLBbao2LtYSJoEIEFoa-U0X5LMTTaGWn5ByOblDWcYNn4yYyBgfWW1VczozJ3vaA9Q-UJco1qY13dKS5lMD69EiWl-N1wyasT0KtKlY65jNxtmXTji1BwvDD_c43i1y9fi8yjbzqgMhEcIHKgR0kCXtkgdG4R260-g0EWUVUxSbpEjAQh31bCUnWZEp3YQ',
    };
    const account = await this.findById(accountId);
    const accessToken = importedAccessToken[account.iban];
    const client = new api.TransactionsApi({ accessToken });
    const iban = account.iban;
    const newLocal = (await client.getCashAccountTransactions(iban)).data
      .transactions;
    console.log('newLocal:', newLocal);
    return newLocal;
  }
}
