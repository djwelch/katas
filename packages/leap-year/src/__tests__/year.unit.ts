import { Year } from "../year";

describe("Year", () => {
  it("cannot be negative", () => {
    expect(() => new Year(-1)).toThrowError("Invalid year");
  });
  it("there is no zero year", () => {
    expect(() => new Year(0)).toThrowError("Invalid year");
  });

  describe(".isLeapYear", () => {
    it.each([[1, 2, 3, 5]])("not a leap year if not divisible by 4", yearValue => {
      const year = new Year(yearValue);
      expect(year.isLeapYear).toBe(false);
    });
    it.each([[4, 8, 12]])("a leap year if divisible by 4", yearValue => {
      const year = new Year(yearValue);
      expect(year.isLeapYear).toBe(true);
    });
    it.each([[400, 800, 1200]])("a leap year if divisible by 400", yearValue => {
      const year = new Year(yearValue);
      expect(year.isLeapYear).toBe(true);
    });
    it.each([[100, 1900, 2200]])("not a leap year if divisible by 100 but not by 400", yearValue => {
      const year = new Year(yearValue);
      expect(year.isLeapYear).toBe(false);
    });
  });
});
