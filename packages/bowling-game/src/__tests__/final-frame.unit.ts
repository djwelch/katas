import { FinalFrameImpl } from "../final-frame";

describe("FinalFrame", () => {
  let GUTTER = 0;
  let SPARE = 1;
  let STRIKE = 10;
  let frame: FinalFrameImpl;
  beforeEach(() => {
    frame = new FinalFrameImpl();
  });
  describe(".roll", () => {
    it("does not complete after rolling a strike", () => {
      expect(frame.roll(10)).toBe(false);
    });
    it("completes after two rolls and not all pins knocked down", () => {
      frame.roll(1);
      expect(frame.roll(8)).toBe(true);
    });
    it("does not complete after a half strike", () => {
      frame.roll(5);
      expect(frame.roll(5)).toBe(false);
    });
    it("completes after a half strike and an extra roll", () => {
      frame.roll(5);
      frame.roll(5);
      expect(frame.roll(10)).toBe(true);
    });
    it("completes after a strike and two extra rolls", () => {
      frame.roll(10);
      expect(frame.roll(9)).toBe(false);
      expect(frame.roll(1)).toBe(true);
    });
    it("completes after a 3 strikes", () => {
      frame.roll(10);
      expect(frame.roll(10)).toBe(false);
      expect(frame.roll(10)).toBe(true);
    });
    it("throws if more than 3 rolls", () => {
      frame.roll(10);
      frame.roll(10);
      frame.roll(10);
      expect(() => frame.roll(1)).toThrow();
    });
    it("throws if roll more than 10 pins", () => {
      expect(() => frame.roll(11)).toThrow();
    });
    it("throws if knock down more than 10 pins", () => {
      frame.roll(1);
      expect(() => frame.roll(10)).toThrow();
    });
    it("throws if more than 3 rolls with no strike", () => {
      frame.roll(1);
      frame.roll(1);
      expect(() => frame.roll(1)).toThrow();
    });
  });
  describe(".score", () => {
    it("should score zero with 2 gutter rolls", () => {
      frame.roll(GUTTER);
      frame.roll(GUTTER);
      expect(frame.score([])).toStrictEqual([0]);
    });
    it("should score one with a spare roll and a gutter rolls", () => {
      frame.roll(SPARE);
      frame.roll(GUTTER);
      expect(frame.score([])).toStrictEqual([1]);
    });
    it("should score a perfect final frame", () => {
      frame.roll(STRIKE);
      frame.roll(STRIKE);
      frame.roll(STRIKE);
      expect(frame.score([])).toStrictEqual([10, 10, 10]);
    });
    it("should get correct score with first half-strike", () => {
      frame.roll(GUTTER);
      frame.roll(STRIKE);
      frame.roll(STRIKE);
      expect(frame.score([])).toStrictEqual([10, 10]);
    });
    it("should get correct score with last half-strike", () => {
      frame.roll(STRIKE);
      frame.roll(GUTTER);
      frame.roll(STRIKE);
      expect(frame.score([])).toStrictEqual([10, 0, 10]);
    });
  });
});
