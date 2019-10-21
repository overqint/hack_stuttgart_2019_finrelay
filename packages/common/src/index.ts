export interface Transaction {
  originIban: string;
  amount: number;
  paymentReference: string;
  counterPartyName: string;
  transactionCode: string;
  valueDate: string;
  counterPartyIban: string;
  paymentIdentification: string;
  mandateReference: string;
  externalBankTransactionDomainCode: string;
  externalBankTransactionFamilyCode: string;
  externalBankTransactionSubFamilyCode: string;
  bookingDate: string;
  id: string;
  e2eReference: string;
  currencyCode: string;
  creditorId: string;
}

export interface GenericEvent<TPayload> {
  ts: Date;
  payload: TPayload;
}