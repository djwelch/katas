import { ConsolePrinter } from "../../prime-composite/src/console-printer";
import { FactorCalculator } from "../src/factor-calculator";

export const ConsolePrinterMock = jest.fn<ConsolePrinter, any[]>(() => ({
  printLine: jest.fn()
}));

export const FactorCalculatorMock = jest.fn<FactorCalculator, any[]>(() => ({
  smallestFactor: jest.fn()
}));
