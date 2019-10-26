import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable()
export class AccountsService {
  constructor(private httpClient: HttpClient) {}

  async findOneById(accountId: string) {
    return this.httpClient
      .get(`http://localhost:3000/accounts/${accountId}`)
      .pipe(take(1))
      .toPromise();
  }

  async getTransactionsByAccountId(accountId: string) {
    return this.httpClient
      .get(`http://localhost:3000/accounts/${accountId}/transactions`)
      .pipe(take(1))
      .toPromise() as any;
  }

  async createAccount(account: any) {
    return this.httpClient
      .post(`http://localhost:3000/accounts/${accountId}`, account)
      .pipe(take(1))
      .toPromise() as any;
  }

  async findAll() {
    return this.httpClient
      .get(`http://localhost:3000/accounts`)
      .pipe(take(1))
      .toPromise() as any;
  }
}
