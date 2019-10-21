import { Injectable } from '@nestjs/common';
import { DeutscheBankTransactionIngestionService } from '../deutsche-bank/deutsche-bank-transaction-ingestion.service';
import {Transaction, GenericEvent} from "../../../common";

@Injectable()
export class TransactionProcessorService {

constructor(private readonly transactionIngestionService: DeutscheBankTransactionIngestionService) {
    transactionIngestionService.next$.subscribe((event: GenericEvent<Transaction>) => {
        const transaction = event.payload;
        console.log('Processing transaction.',  event.ts, transaction);
    })
}

}
