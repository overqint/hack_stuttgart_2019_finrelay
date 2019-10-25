import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountsService {
  findAll(): any[] | PromiseLike<any[]> {
    return [
      {
        id: 'DBank1',
        name: 'Deutsche Bank TEST',
        type: 'iban',
      },
    ];
  }
  constructor(private httpClient: HttpClient) {}
}
