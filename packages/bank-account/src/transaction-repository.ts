import { PendingTransaction, VerifiedTransaction } from "./transaction";
import { DatedTransactionVerifier, TransactionVerifier } from "./transaction-verifier";

export interface TransactionRepository {
  add(transaction: PendingTransaction): void;
  all(): VerifiedTransaction[];
}

export class MemoryTransactionRepository implements TransactionRepository {
  private storage: VerifiedTransaction[] = [];

  constructor(private factory: TransactionVerifier) {}

  add(transaction: PendingTransaction): void {
    this.storage.push(this.factory.verify(transaction));
  }

  all(): VerifiedTransaction[] {
    return [...this.storage];
  }
}
