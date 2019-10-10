import { ConsolePrinter } from "../console-printer";
import { DateFormatter } from "../date-formatter";
import { DateProvider } from "../date-provider";
import { StatementPrinter } from "../statement-printer";
import { TransactionRepository } from "../transaction-repository";
import { TransactionVerifier } from "../transaction-verifier";

export const MockTransactionRepository = jest.fn<TransactionRepository, any[]>(() => ({
  add: jest.fn(),
  all: jest.fn()
}));

export const MockStatementPrinter = jest.fn<StatementPrinter, any[]>(() => ({
  print: jest.fn()
}));

export const MockConsolePrinter = jest.fn<ConsolePrinter, any[]>(() => ({
  printLine: jest.fn()
}));

export const MockDateFormatter = jest.fn<DateFormatter, any[]>((str: string) => ({
  formatDate: jest.fn(() => str)
}));

export const MockTransactionVerifier = jest.fn<TransactionVerifier, any[]>(() => ({
  verify: jest.fn()
}));

export const MockDateProvider = jest.fn<DateProvider, any[]>(dateValue => ({
  getDate: jest.fn(() => dateValue)
}));
