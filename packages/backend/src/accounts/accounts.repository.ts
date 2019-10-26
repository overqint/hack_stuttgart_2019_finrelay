import { Injectable } from '@nestjs/common';
import * as api from '../deutsche-bank/api-client/transactions';

@Injectable()
export class AccountsRepository {
  async findOneById(accountId: string) {
    const linkedAccount = {
      iban:
        accountId === 'DBank1'
          ? 'DE10010000000000005211'
          : 'DE10010000000000005250',
    };
    return {
      _id: accountId,
      name: accountId,
      linkedAccount,
    };
  }

  async getTransactionsByAccountId(accountId: string) {
    const importedAccessToken = {
      DE10010000000000005211:
        'eyJraWQiOiJyc2ExIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiIxMDAxMDAzNDA1MDAwMDEiLCJhenAiOiJkZXZlbG9wZXJwb3J0YWwiLCJpc3MiOiJodHRwczpcL1wvc2ltdWxhdG9yLWFwaS5kYi5jb21cL2d3XC9vaWRjXC8iLCJleHAiOjE1NzIwNjk0OTAsImlhdCI6MTU3MjA2NTg5MCwianRpIjoiNTMyNTViMDUtMzk1Ni00MjE3LTk1NzYtZjUyMTBhZDgwMWM3In0.RwwunEC0OydRPbA6LEVxc3ZGH0HPdycCxHcSPA2fNjMqWSVC5OybBZISbioAolG1pBjKlJDUzDUc9jJbTI6cgdSBOOb86dQpix0niBL66sa7LOE94mVIObaYox0JEXf7Jw46MkSQbsvOKMGyHSf2ocJXmRrq9tF3lOuFafl9hak4H9ZCJ5iGaVkvDsjp-kVSlB1Hz7m0Me5RjRyZvORY8bqwaDGOdxZh03Koj6B2MS3f7EdMMt7BCMgoqG0SrTpNPfueZk4ddyLknXtgrExfONYALB04dBoN-etlm296N1JnW9DTVoWO8TGR1kmh9RvohcTUccwoeJJEcohkZZpiIQ',
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
