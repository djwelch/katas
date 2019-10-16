import { ConsolePrinter } from "../src/console-printer";
import { FactorCalculator } from "../src/factor-calculator";
import { FormatNumber } from "../src/format-number";
import { RangePrinter } from "../src/range-printer";
import { ConsolePrinterMock } from "./_mocks";

describe("The range printing feature", () => {
  let consolePrinter: ConsolePrinter;
  let printer: RangePrinter;
  beforeEach(() => {
    consolePrinter = new ConsolePrinterMock();
    printer = new RangePrinter(consolePrinter, new FormatNumber(new FactorCalculator()));
  });

  it("prints the types of numbers from 1 to 10", () => {
    printer.printRange(1, 10);

    expect(consolePrinter.printLine).toHaveBeenNthCalledWith(1, "composite");
    expect(consolePrinter.printLine).toHaveBeenNthCalledWith(2, "prime");
    expect(consolePrinter.printLine).toHaveBeenNthCalledWith(3, "prime");
    expect(consolePrinter.printLine).toHaveBeenNthCalledWith(4, "4");
    expect(consolePrinter.printLine).toHaveBeenNthCalledWith(5, "prime");
    expect(consolePrinter.printLine).toHaveBeenNthCalledWith(6, "6");
    expect(consolePrinter.printLine).toHaveBeenNthCalledWith(7, "prime");
    expect(consolePrinter.printLine).toHaveBeenNthCalledWith(8, "8");
    expect(consolePrinter.printLine).toHaveBeenNthCalledWith(9, "composite");
    expect(consolePrinter.printLine).toHaveBeenNthCalledWith(10, "10");
  });
});
