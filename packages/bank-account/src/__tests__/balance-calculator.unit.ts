import { BalanceCalculator } from "../balance-calculator";

describe("BalanceCalculator", () => {
  describe(".runningBalance", () => {
    it("should calculate the balance and return in reverse order", () => {
      const trans = [
        { amount: -1, date: new Date(2000, 1, 2) },
        { amount: 100, date: new Date(2000, 1, 1) },
        { amount: -1, date: new Date(2000, 1, 3) }
      ];
      expect(new BalanceCalculator(trans).runningBalance()).toStrictEqual([
        [trans[2], 98],
        [trans[1], 99],
        [trans[0], 100]
      ]);
    });
  });
});
