import { ConsolePrinter } from "./console-printer";
import { NumberParityCalculator } from "./number-parity-calculator";
import { PrimeNumberCalculator } from "./prime-number-calculator";

export class NumberPrinter {
  constructor(
    private printer: ConsolePrinter,
    private primeCalculator: PrimeNumberCalculator,
    private parityCalculator: NumberParityCalculator
  ) {}

  printRange(range: Generator<number>) {
    for (let i of range) {
      if (this.primeCalculator.isPrime(i)) {
        this.printer.printLine("prime");
      } else {
        if (this.parityCalculator.isEven(i)) {
          this.printer.printLine(i.toString());
        } else {
          this.printer.printLine("composite");
        }
      }
    }
  }
}
