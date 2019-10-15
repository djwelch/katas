import { FinalFrame } from "../final-frame";
import { FirstFrame } from "../first-frame";
import { FrameFactory } from "../frame-factory";

describe("FrameFactory", () => {
  describe(".startFrame", () => {
    it("returns a new frame", () => {
      expect(new FrameFactory().startFrame(1)).toBeInstanceOf(FirstFrame);
    });
    it("returns a final frame on last round", () => {
      expect(new FrameFactory().startFrame(10)).toBeInstanceOf(FinalFrame);
    });
  });
});
