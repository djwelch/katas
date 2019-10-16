import { ConsolePrinterMock, NumberParityCalculatorMock, PrimeNumberCalculatorMock } from "../../__tests__/_mocks";
import { ConsolePrinter } from "../console-printer";
import { NumberParityCalculator } from "../number-parity-calculator";
import { NumberPrinter } from "../number-printer";
import { PrimeNumberCalculator } from "../prime-number-calculator";

describe("NumberPrinter", () => {
  let EVEN_NUMBERS = function*() {
    yield* [2, 4, 6];
  };
  let PRIME_NUMBERS = function*() {
    yield* [3, 5, 7];
  };
  let COMPOSITE_NUMBERS = function*() {
    yield* [1];
  };
  let consolePrinter: ConsolePrinter;
  let primeNumber: PrimeNumberCalculator;
  let numberParity: NumberParityCalculator;
  let printer: NumberPrinter;
  beforeEach(() => {
    consolePrinter = new ConsolePrinterMock();
    primeNumber = new PrimeNumberCalculatorMock();
    numberParity = new NumberParityCalculatorMock();
    printer = new NumberPrinter(consolePrinter, primeNumber, numberParity);
  });

  describe(".printRange", () => {
    it("with all even numbers should just print the numbers", () => {
      numberParity.isEven = jest.fn().mockReturnValue(true);
      printer.printRange(EVEN_NUMBERS());
      expect(consolePrinter.printLine).toHaveBeenNthCalledWith(1, "2");
      expect(consolePrinter.printLine).toHaveBeenNthCalledWith(2, "4");
      expect(consolePrinter.printLine).toHaveBeenNthCalledWith(3, "6");
    });
    it("all prime numbers should print 'prime'", () => {
      primeNumber.isPrime = jest.fn().mockReturnValue(true);
      printer.printRange(PRIME_NUMBERS());
      expect(consolePrinter.printLine).toHaveBeenNthCalledWith(1, "prime");
      expect(consolePrinter.printLine).toHaveBeenNthCalledWith(2, "prime");
      expect(consolePrinter.printLine).toHaveBeenNthCalledWith(3, "prime");
    });
    it("all composite numbers should print 'composite'", () => {
      numberParity.isEven = jest.fn().mockReturnValue(false);
      printer.printRange(COMPOSITE_NUMBERS());
      expect(consolePrinter.printLine).toHaveBeenNthCalledWith(1, "composite");
    });
  });
});
