import { Account } from "../src/account";
import { ConsolePrinter } from "../src/console-printer";
import { DateFormatterImpl } from "../src/date-formatter";
import { DateProvider } from "../src/date-provider";
import { StatementPrinterImpl } from "../src/statement-printer";
import { MemoryTransactionRepository } from "../src/transaction-repository";
import { DatedTransactionVerifier } from "../src/transaction-verifier";

const MockPrinter = jest.fn<ConsolePrinter, any[]>(() => ({
  printLine: jest.fn()
}));

const MockDate = jest.fn<DateProvider, any[]>(() => ({
  getDate: jest.fn()
}));

beforeEach(() => {
  MockPrinter.mockClear();
});

describe("The print statement feature", () => {
  it("should contain all the transactions that have occurred in an account", () => {
    const date = new MockDate();
    date.getDate = jest
      .fn()
      .mockImplementationOnce(() => new Date(2014, 4, 1, 10))
      .mockImplementationOnce(() => new Date(2014, 4, 2, 10))
      .mockImplementationOnce(() => new Date(2014, 4, 10, 10));
    const printer = new MockPrinter();
    const account = new Account(
      new MemoryTransactionRepository(new DatedTransactionVerifier(date)),
      new StatementPrinterImpl(new DateFormatterImpl(), printer)
    );

    account.deposit(1000);
    account.withdraw(100);
    account.deposit(500);

    account.print();

    expect(printer.printLine).nthCalledWith(1, "DATE | AMOUNT | BALANCE");
    expect(printer.printLine).nthCalledWith(2, "2014-04-10 | 500.00 | 1400.00");
    expect(printer.printLine).nthCalledWith(3, "2014-04-02 | -100.00 | 900.00");
    expect(printer.printLine).nthCalledWith(4, "2014-04-01 | 1000.00 | 1000.00");
  });
});
