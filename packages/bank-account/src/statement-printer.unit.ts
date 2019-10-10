import { ConsolePrinter } from "./console-printer";
import { StatementPrinter, StatementPrinterImpl } from "./statement-printer";

const Console = jest.fn<ConsolePrinter, any[]>(() => ({
  printLine: jest.fn()
}));

describe("StatementPrinter", () => {
  let console: ConsolePrinter;
  let printer: StatementPrinter;
  beforeEach(() => {
    console = new Console();
    printer = new StatementPrinterImpl(console);
  });

  describe(".print", () => {
    it("prints the header first", () => {
      printer.print([]);
      expect(console.printLine).toBeCalledTimes(1);
      expect(console.printLine).toHaveBeenNthCalledWith(1, "DATE | AMOUNT | BALANCE");
    });
  });
});
