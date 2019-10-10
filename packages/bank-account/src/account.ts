import { TransactionRepository } from "./transaction-repository";

export class Account {
  constructor(private repository: TransactionRepository = new TransactionRepository()) {}

  deposit(amount: number): void {}

  withdraw(amount: number): void {}

  print(): void {}
}
