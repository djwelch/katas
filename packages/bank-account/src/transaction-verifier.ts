import { DateProvider } from "./date-provider";
import { NotImplementedError } from "./not-implemented-error";
import { PendingTransaction, VerifiedTransaction } from "./transaction";
import { TransactionRepository } from "./transaction-repository";

export interface TransactionVerifier {
  verify(transaction: PendingTransaction): VerifiedTransaction;
}

export class DatedTransactionVerifier implements TransactionVerifier {
  constructor(private dateProvider: DateProvider) {}

  verify(transaction: PendingTransaction): VerifiedTransaction {
    const date = this.dateProvider.getDate();
    return { amount: transaction.type === "withdraw" ? -transaction.amount : transaction.amount, date };
  }
}
