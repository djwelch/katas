import { ConsolePrinter } from "../src/console-printer";

export const MockConsolePrinter = jest.fn<ConsolePrinter, any[]>(() => ({
  printLine: jest.fn()
}));
