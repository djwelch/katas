import { FrameImpl } from "../frame";

describe("Frame", () => {
  let GUTTER = 0;
  let SPARE = 1;
  let HALFSTRIKE = 9;
  let STRIKE = 10;
  let frame: FrameImpl;
  beforeEach(() => {
    frame = new FrameImpl();
  });

  describe(".roll", () => {
    it("completes after rolling a strike", () => {
      expect(frame.roll(10)).toBe(true);
    });

    it("does not complete on first roll if no strike", () => {
      expect(frame.roll(9)).toBe(false);
    });

    it("completes on second roll", () => {
      frame.roll(1);
      expect(frame.roll(1)).toBe(true);
    });

    it("can't knock own more pins than there are in one roll", () => {
      expect(() => frame.roll(11)).toThrowError();
    });

    it("can't knock own more pins than there are in two rolls", () => {
      frame.roll(1);
      expect(() => frame.roll(10)).toThrowError();
    });

    it("can't roll more than twice", () => {
      frame.roll(1);
      frame.roll(1);
      expect(() => frame.roll(1)).toThrowError();
    });
  });
  describe(".score", () => {
    it("scores gutter rolls", () => {
      frame.roll(GUTTER);
      frame.roll(GUTTER);
      expect(frame.score([STRIKE, STRIKE])).toStrictEqual([0]);
    });
    it("scores normal rolls", () => {
      frame.roll(SPARE);
      frame.roll(GUTTER);
      expect(frame.score([STRIKE, STRIKE])).toStrictEqual([1]);
    });
    it("scores half-strike rolls followed by gutter", () => {
      frame.roll(HALFSTRIKE);
      frame.roll(SPARE);
      expect(frame.score([GUTTER, STRIKE])).toStrictEqual([10]);
    });
    it("scores half-strike rolls followed by strike", () => {
      frame.roll(HALFSTRIKE);
      frame.roll(SPARE);
      expect(frame.score([STRIKE, STRIKE])).toStrictEqual([20]);
    });
    it("scores strike rolls followed by strikes", () => {
      frame.roll(STRIKE);
      expect(frame.score([STRIKE, STRIKE])).toStrictEqual([30]);
    });
  });
});
