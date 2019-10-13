import { FrameImpl } from "../frame";

describe("Frame", () => {
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
});
