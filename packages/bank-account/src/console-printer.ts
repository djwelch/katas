import { NotImplementedError } from "./not-implemented-error";

export class ConsolePrinter {
  printLine(line: string) {
    throw new NotImplementedError();
  }
}
