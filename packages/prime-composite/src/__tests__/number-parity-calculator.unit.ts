import { NumberParityCalculator } from "../number-parity-calculator";

describe("NumberParityCalculator", () => {
  let calculator: NumberParityCalculator;
  beforeEach(() => {
    calculator = new NumberParityCalculator();
  });
  describe(".isEven", () => {
    it("1 is not even", () => {
      expect(calculator.isEven(1)).toBe(false);
    });
    it("2 is even", () => {
      expect(calculator.isEven(2)).toBe(true);
    });
  });
});
