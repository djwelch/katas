import { FactorCalculator } from "../factor-calculator";

describe("FactorCalculator", () => {
  let calculator: FactorCalculator;
  beforeEach(() => {
    calculator = new FactorCalculator();
  });
  describe(".smallestFactor", () => {
    it.each([[1, 1], [2, 2], [3, 3], [4, 2]])("calculatest the smallest factor", (n, f) => {
      expect(calculator.smallestFactor(n)).toBe(f);
    });
  });
});
