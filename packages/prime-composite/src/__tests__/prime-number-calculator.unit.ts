import { PrimeNumberCalculator } from "../prime-number-calculator";

describe("PrimeNumberCalculator", () => {
  let calculator: PrimeNumberCalculator;
  beforeEach(() => {
    calculator = new PrimeNumberCalculator();
  });

  describe(".isPrime", () => {
    it("1 is not prime", () => {
      expect(calculator.isPrime(1)).toBe(false);
    });
    it("2 is a prime number", () => {
      expect(calculator.isPrime(2)).toBe(true);
    });
    it("3 is a prime number", () => {
      expect(calculator.isPrime(3)).toBe(true);
    });
    it("4 is not a prime number", () => {
      expect(calculator.isPrime(4)).toBe(false);
    });
    it("5 is a prime number", () => {
      expect(calculator.isPrime(5)).toBe(true);
    });
  });
});
