import { ConsolePrinter } from "./console-printer";
import { DateFormatter, DateFormatterImpl } from "./date-formatter";
import { NotImplementedError } from "./not-implemented-error";
import { PendingTransaction, VerifiedTransaction } from "./transaction";

export interface StatementPrinter {
  print(transactions: VerifiedTransaction[]): void;
}

export class StatementPrinterImpl implements StatementPrinter {
  constructor(private dateFormatter: DateFormatter, private console: ConsolePrinter) {}

  print(transactions: VerifiedTransaction[]): void {
    this.console.printLine("DATE | AMOUNT | BALANCE");

    let runningBal = 0;
    transactions
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map(t => {
        runningBal += t.amount;
        return this.transactionToLine(t, runningBal);
      })
      .reverse()
      .forEach(line => this.console.printLine(line));
  }

  private transactionToLine(t: VerifiedTransaction, runningBal: number): string {
    const formattedDate = this.dateFormatter.formatDate(t.date);
    const formattedNumber = t.amount.toFixed(2);
    return `${formattedDate} | ${formattedNumber} | ${runningBal.toFixed(2)}`;
  }
}
