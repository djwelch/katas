import { DateProvider } from "./date-provider";
import { NotImplementedError } from "./not-implemented-error";
import { Transaction, VerifiedTransaction } from "./transaction";
import { TransactionRepository } from "./transaction-repository";

export interface TransactionVerifier {
  verify(transaction: Transaction): VerifiedTransaction;
}

export class DatedTransactionVerifier implements TransactionVerifier {
  constructor(private dateProvider: DateProvider = new DateProvider()) {}

  verify(transaction: Transaction): VerifiedTransaction {
    return { ...transaction, date: this.dateProvider.getDate() };
  }
}
