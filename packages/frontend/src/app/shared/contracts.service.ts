import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable()
export class ContractsService {
  constructor(private httpClient: HttpClient) {}

  async findOneById(contractId: string) {
    return this.httpClient
      .get(`http://localhost:3000/contracts/${contractId}`)
      .pipe(take(1))
      .toPromise();
  }

  async executeOneById(contractId: string) {
    return this.httpClient
      .post(`http://localhost:3000/contracts/${contractId}/execute`, {})
      .pipe(take(1))
      .toPromise();
  }

  async findAll() {
    return this.httpClient
      .get(`http://localhost:3000/contracts`)
      .pipe(take(1))
      .toPromise() as any;
  }
}
