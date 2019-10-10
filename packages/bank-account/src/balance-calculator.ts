import { NotImplementedError } from "./not-implemented-error";
import { VerifiedTransaction } from "./transaction";

export class BalanceCalculator {
  private sortedTransactions = this.transactions.sort((a, b) => a.date.valueOf() - b.date.valueOf());
  constructor(private transactions: VerifiedTransaction[]) {}

  runningBalance(): [VerifiedTransaction, number][] {
    let bal = 0;
    return <[VerifiedTransaction, number][]>this.sortedTransactions.map(t => [t, (bal += t.amount)]).reverse();
  }
}
