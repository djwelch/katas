import { ConsolePrinter } from "../src/console-printer";
import { NumberParityCalculator } from "../src/number-parity-calculator";
import { NumberPrinter } from "../src/number-printer";
import { PrimeNumberCalculator } from "../src/prime-number-calculator";
import { ConsolePrinterMock } from "./_mocks";

describe("The number type printer", () => {
  const TEN_NUMBERS = function*() {
    var i = 0;
    while (i < 10) {
      yield ++i;
    }
  };
  let consolePrinter: ConsolePrinter;
  let printer: NumberPrinter;
  beforeEach(() => {
    consolePrinter = new ConsolePrinterMock();
    printer = new NumberPrinter(consolePrinter, new PrimeNumberCalculator(), new NumberParityCalculator());
  });

  it("prints the types of numbers from 1 to 10", () => {
    printer.printRange(TEN_NUMBERS());

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
