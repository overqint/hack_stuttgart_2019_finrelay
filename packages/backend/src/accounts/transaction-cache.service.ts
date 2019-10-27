export class TransactionCacheService {
  static instance: TransactionCacheService;

  constructor() {
    if (!TransactionCacheService.instance) {
      TransactionCacheService.instance = this;
    }
  }

  private _cache = new Map<string, any[]>();

  addTransactions(iban: string, transactions: any[]) {
    console.log('addTransactions', iban, transactions);
    if (!this._cache.has(iban)) {
      this._cache.set(iban, []);
    }
    let cachedTransactions = this._cache.get(iban);
    cachedTransactions = [...cachedTransactions, ...transactions];
    this._cache.set(iban, cachedTransactions);
  }

  getTransactions(iban: string) {
    if (!this._cache.has(iban)) {
      this._cache.set(iban, []);
    }
    const cachedTransactions = this._cache.get(iban);
    return cachedTransactions;
  }
}
