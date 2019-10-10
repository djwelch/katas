import { DateFormatterImpl } from "./date-formatter";

describe("DateFormatter", () => {
  describe(".formatDate", () => {
    it("formats the date", () => {
      expect(new DateFormatterImpl().formatDate(new Date(2019, 1, 5))).toBe("2019-01-05");
    });
  });
});
