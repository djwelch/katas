import { ConsolePrinter } from "../src/console-printer";
import { NumberParityCalculator } from "../src/number-parity-calculator";
import { PrimeNumberCalculator } from "../src/prime-number-calculator";

export const ConsolePrinterMock = jest.fn<ConsolePrinter, any[]>(() => ({
  printLine: jest.fn()
}));

export const PrimeNumberCalculatorMock = jest.fn<PrimeNumberCalculator, any[]>(() => ({
  isPrime: jest.fn()
}));

export const NumberParityCalculatorMock = jest.fn<NumberParityCalculator, any[]>(() => ({
  isEven: jest.fn()
}));
