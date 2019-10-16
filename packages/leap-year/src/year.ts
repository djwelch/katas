export class Year {
  constructor(private value: number) {
    this.requirePositiveYear();
  }

  private requirePositiveYear() {
    if (this.value <= 0) throw new Error("Invalid year");
  }

  public get isLeapYear(): boolean {
    if (this.divisibleBy(100)) {
      return this.divisibleBy(400);
    } else {
      return this.divisibleBy(4);
    }
  }

  private divisibleBy(divisor: number): boolean {
    return this.value % divisor === 0;
  }
}
