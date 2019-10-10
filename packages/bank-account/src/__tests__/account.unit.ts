import { Account } from "../account";
import { StatementPrinter } from "../statement-printer";
import { VerifiedTransaction } from "../transaction";
import { TransactionRepository } from "../transaction-repository";
import { MockStatementPrinter, MockTransactionRepository } from "./_mocks";

describe("Account", () => {
  let repo: TransactionRepository;
  let printer: StatementPrinter;
  let account: Account;

  beforeEach(() => {
    repo = new MockTransactionRepository();
    printer = new MockStatementPrinter();
    account = new Account(repo, printer);
  });

  describe(".deposit", () => {
    it("adds a deposit transaction to the repository", () => {
      account.deposit(10);
      expect(repo.add).toBeCalledWith({ type: "deposit", amount: 10 });
    });
  });
  describe(".withdraw", () => {
    it("adds a withdraw transaction to the repository", () => {
      account.withdraw(20);
      expect(repo.add).toBeCalledWith({ type: "withdraw", amount: 20 });
    });
  });
  describe(".print", () => {
    it("prints the statement", () => {
      const transactions: VerifiedTransaction[] = [{ amount: 20, date: new Date() }];
      repo.all = jest.fn(() => transactions);

      account.print();

      expect(printer.print).toBeCalledWith(transactions);
    });
  });
});
