export class FactorCalculator {
  smallestFactor(n: number): number {
    for (let factor = 2; factor < n; ++factor) {
      if (n % factor === 0) return factor;
    }
    return n;
  }
}
