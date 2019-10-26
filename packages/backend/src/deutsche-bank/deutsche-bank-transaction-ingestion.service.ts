import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { DataFrame } from 'data-forge';
import * as fs from 'fs';
import * as path from 'path';
import { TEST_TRANSACTION_DATA } from './test-transaction-data.const';

@Injectable()
export class DeutscheBankTransactionIngestionService {
  private _nextSubject = new Subject();
  private _next$ = this._nextSubject.asObservable();

  public async initialize() {
    console.log('Initializing DeutscheBankTransactionIngestionService...');
    /*
    setInterval(() => {
      const df = new DataFrame(TEST_TRANSACTION_DATA.transactions).take(5);
      console.log(df.toString());
      const events = df
        .select(payload => ({
          ts: new Date(),
          payload,
        }))
        .toArray();
      for (const event of events) {
        this._nextSubject.next(event);
      }
    }, 5000);
    */
    console.log('Initialized DeutscheBankTransactionIngestionService.');
  }

  public get next$() {
    return this._next$;
  }
}
