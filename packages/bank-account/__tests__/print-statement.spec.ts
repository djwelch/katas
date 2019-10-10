import { Account } from "../src/account";
import { ConsolePrinter } from "../src/console-printer";
import { StatementPrinterImpl } from "../src/statement-printer";
import { MemoryTransactionRepository } from "../src/transaction-repository";
import { DatedTransactionVerifier } from "../src/transaction-verifier";

const MockPrinter = jest.fn<ConsolePrinter, any[]>(() => ({
  printLine: jest.fn()
}));

beforeEach(() => {
  MockPrinter.mockClear();
});

describe("The print statement feature", () => {
  it("should contain all the transactions that have occurred in an account", () => {
    const printer = new MockPrinter();
    const account = new Account(
      new MemoryTransactionRepository(new DatedTransactionVerifier()),
      new StatementPrinterImpl(printer)
    );
    account.deposit(500);
    account.withdraw(-100);
    account.deposit(1000);

    account.print();

    expect(printer.printLine).toBeCalledWith("DATE | AMOUNT | BALANCE");
    expect(printer.printLine).toBeCalledWith("2014-04-10 | 500.00 | 1400.00");
    expect(printer.printLine).toBeCalledWith("2014-04-02 | -100.00 | 900.00");
    expect(printer.printLine).toBeCalledWith("2014-04-01 | 1000.00 | 1000.00");
  });
});
