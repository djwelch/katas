import { FactorCalculator } from "./factor-calculator";

export class FormatNumber {
  constructor(private factorCalculator: FactorCalculator) {}

  public toString(n: number) {
    const smallestFactor = this.factorCalculator.smallestFactor(n);
    const isPrime = n !== 1 && smallestFactor === n;
    const isEven = smallestFactor === 2;
    if (isPrime) {
      return "prime";
    }
    if (isEven) {
      return n.toString();
    }
    return "composite";
  }
}
