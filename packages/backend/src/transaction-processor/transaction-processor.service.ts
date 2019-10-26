import { Injectable } from '@nestjs/common';
import { DeutscheBankTransactionIngestionService } from '../deutsche-bank/deutsche-bank-transaction-ingestion.service';

@Injectable()
export class TransactionProcessorService {

constructor(private readonly transactionIngestionService: DeutscheBankTransactionIngestionService) {
    transactionIngestionService.next$.subscribe((event: any) => {

    })
}

}
