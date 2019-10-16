import { ConsolePrinterMock, FactorCalculatorMock } from "../../__tests__/_mocks";
import { ConsolePrinter } from "../console-printer";
import { FactorCalculator } from "../factor-calculator";
import { FormatNumber } from "../format-number";
import { RangePrinter } from "../range-printer";

describe("RangePrinter", () => {
  let consolePrinter: ConsolePrinter;
  let factorCalculator: FactorCalculator;
  let printer: RangePrinter;
  beforeEach(() => {
    consolePrinter = new ConsolePrinterMock();
    factorCalculator = new FactorCalculatorMock();
    factorCalculator.smallestFactor = jest
      .fn()
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(3)
      .mockReturnValueOnce(2);
    printer = new RangePrinter(consolePrinter, new FormatNumber(factorCalculator));
  });

  describe(".printRange", () => {
    it("1 -> 3 prints prime", () => {
      printer.printRange(1, 3);
      expect(consolePrinter.printLine).toHaveBeenNthCalledWith(1, "composite");
      expect(consolePrinter.printLine).toHaveBeenNthCalledWith(2, "prime");
      expect(consolePrinter.printLine).toHaveBeenNthCalledWith(3, "prime");
    });
    it("1 -> 4 prints even last", () => {
      printer.printRange(1, 4);
      expect(consolePrinter.printLine).toHaveBeenNthCalledWith(4, "4");
    });
  });
});
