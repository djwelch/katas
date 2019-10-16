import { ConsolePrinter } from "./console-printer";
import { FormatNumber } from "./format-number";

export class RangePrinter {
  constructor(private printer: ConsolePrinter, private formatter: FormatNumber) {}

  printRange(from: number, to: number): void {
    for (let n = from; n <= to; ++n) {
      const line = this.formatter.toString(n);
      this.printer.printLine(line);
    }
  }
}
