import { ConsolePrinter } from "./console-printer";
import { NotImplementedError } from "./not-implemented-error";
import { VerifiedTransaction } from "./transaction";

export interface StatementPrinter {
  print(transactions: VerifiedTransaction[]): void;
}

export class StatementPrinterImpl implements StatementPrinter {
  constructor(private console: ConsolePrinter = new ConsolePrinter()) {}

  print(transactions: VerifiedTransaction[]): void {
    this.console.printLine("DATE | AMOUNT | BALANCE");
    transactions.forEach(t => this.console.printLine(`${t.date} | ${t.type === "deposit" ? t.amount : -t.amount} | `));
  }
}
