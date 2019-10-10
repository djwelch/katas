import { StatementPrinter, StatementPrinterImpl } from "./statement-printer";
import { MemoryTransactionRepository, TransactionRepository } from "./transaction-repository";
import { DatedTransactionVerifier } from "./transaction-verifier";

export class Account {
  constructor(
    private repository: TransactionRepository = new MemoryTransactionRepository(new DatedTransactionVerifier()),
    private printer: StatementPrinter = new StatementPrinterImpl()
  ) {}

  deposit(amount: number): void {
    this.repository.add({ type: "deposit", amount });
  }

  withdraw(amount: number): void {
    this.repository.add({ type: "withdraw", amount });
  }

  print(): void {
    this.printer.print(this.repository.all());
  }
}
