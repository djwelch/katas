import { Account } from "../src/account";
import { Printer } from "../src/printer";

const MockPrinter = jest.fn<Printer, any[]>(() => ({
  printLine: jest.fn()
}));

beforeEach(() => {
  MockPrinter.mockClear();
});

describe("The print statement feature", () => {
  it("should contain all the transactions", () => {
    const printer = new MockPrinter();
    const account = new Account();
    account.deposit(500);
    account.withdraw(-100);
    account.deposit(1000);

    expect(printer.printLine).toBeCalledWith("DATE | AMOUNT | BALANCE");
    expect(printer.printLine).toBeCalledWith("2014-04-10 | 500.00 | 1400.00");
    expect(printer.printLine).toBeCalledWith("2014-04-02 | -100.00 | 900.00");
    expect(printer.printLine).toBeCalledWith("2014-04-01 | 1000.00 | 1000.00");
  });
});
