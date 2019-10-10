import { ConsolePrinter } from "./console-printer";
import { DateFormatter, DateFormatterImpl } from "./date-formatter";
import { StatementPrinter, StatementPrinterImpl } from "./statement-printer";
import { VerifiedTransaction } from "./transaction";

const Console = jest.fn<ConsolePrinter, any[]>(() => ({
  printLine: jest.fn()
}));

const DateFormatter = jest.fn<DateFormatter, any[]>(() => ({
  formatDate: jest.fn(() => "<date>")
}));

describe("StatementPrinter", () => {
  const NO_TRANSACTIONS: VerifiedTransaction[] = [];
  const SOME_TRANSACTIONS: VerifiedTransaction[] = [
    { amount: 1000, date: new Date(2014, 4, 1) },
    { amount: -100, date: new Date(2014, 4, 2) },
    { amount: 500, date: new Date(2014, 4, 10) }
  ];
  let output: ConsolePrinter;
  let dateFormatter: DateFormatter;
  let printer: StatementPrinter;

  beforeEach(() => {
    output = new Console();
    dateFormatter = new DateFormatter();
    printer = new StatementPrinterImpl(dateFormatter, output);
  });

  describe(".print", () => {
    it("with no transactions just prints the header", () => {
      printer.print(NO_TRANSACTIONS);
      expect(output.printLine).toBeCalledTimes(1);
      expect(output.printLine).toHaveBeenNthCalledWith(1, "DATE | AMOUNT | BALANCE");
    });

    it("with some transactions prints them", () => {
      printer.print(SOME_TRANSACTIONS);
      expect(output.printLine).toHaveBeenNthCalledWith(2, "<date> | 500.00 | 1400.00");
      expect(output.printLine).toHaveBeenNthCalledWith(3, "<date> | -100.00 | 900.00");
      expect(output.printLine).toHaveBeenNthCalledWith(4, "<date> | 1000.00 | 1000.00");
    });
  });
});
