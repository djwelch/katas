import { Transaction, VerifiedTransaction } from "./transaction";
import { DatedTransactionVerifier, TransactionVerifier } from "./transaction-verifier";

export interface TransactionRepository {
  add(transaction: Transaction): void;
  all(): VerifiedTransaction[];
}

export class MemoryTransactionRepository implements TransactionRepository {
  private storage: VerifiedTransaction[] = [];

  constructor(private factory: TransactionVerifier = new DatedTransactionVerifier()) {}

  add(transaction: Transaction): void {
    this.storage.push(this.factory.verify(transaction));
  }

  all(): VerifiedTransaction[] {
    return [...this.storage];
  }
}
