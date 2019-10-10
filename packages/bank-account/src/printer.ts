import { NotImplementedError } from "./not-implemented-error";

export class Printer {
  printLine(line: string) {
    throw new NotImplementedError();
  }
}
