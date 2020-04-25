import { ConsolePrinter } from "./console-printer";

export class FizzBuzz {

  constructor(private printer: ConsolePrinter) {}

  public play(): void {
    for(let number = 1; number <= 100; ++number) {
      this.printNumber(number);
    }
  }

  private printNumber(number: number): void {
      if (number % 3 === 0 && number % 5 === 0) {
        this.printer.printLine("Fizz Buzz");
      } else if (number % 3 === 0) {
        this.printer.printLine("Fizz");
      } else if (number % 5 === 0) {
        this.printer.printLine("Buzz");
      } else {
        this.printer.printLine(number.toString());
      }
  }

}
