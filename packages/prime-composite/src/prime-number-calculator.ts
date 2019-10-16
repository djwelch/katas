export class PrimeNumberCalculator {
  public isPrime(n: number): boolean {
    if (n <= 1) return false;
    let divisor = n - 1;
    while (divisor !== 1) {
      if (this.divides(n, divisor)) return false;
      --divisor;
    }
    return true;
  }

  private divides(n: number, divisor: number) {
    return n % divisor === 0;
  }
}
