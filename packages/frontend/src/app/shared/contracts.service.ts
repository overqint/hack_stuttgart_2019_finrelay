import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';


@Injectable()
export class ContractsService {


  constructor(private httpClient: HttpClient) { }

  async findOneById(contractId: string) {
    return this.httpClient
      .get(`http://localhost:3000/contracts/${contractId}`)
      .pipe(take(1))
      .toPromise();
  }

  async executeOneById(contractId: string, payload: any) {
    return this.httpClient
      .post(`http://localhost:3000/contracts/${contractId}/execute`, payload)
      .pipe(take(1))
      .toPromise();
  }

  async findAll() {
    return this.httpClient
      .get(`http://localhost:3000/contracts`)
      .pipe(take(1))
      .toPromise() as any;
  }

  async updateOneById(id: string, contract: any) {
    return this.httpClient
      .post(`http://localhost:3000/contracts/${id}`, contract)
      .pipe(take(1))
      .toPromise();
  }

  async deleteOneById(contractId: string) {
    return this.httpClient
      .delete(`http://localhost:3000/contracts/${contractId}/delete`)
      .pipe(take(1))
      .toPromise();
  }

  async createContract(contract) {
    return this.httpClient
      .post(`http://localhost:3000/contracts`, contract)
      .pipe(take(1))
      .toPromise() as any;
  }
}
