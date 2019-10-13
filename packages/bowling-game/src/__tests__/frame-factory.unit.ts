import { FinalFrameImpl } from "../final-frame";
import { FrameImpl } from "../frame";
import { FrameFactoryImpl } from "../frame-factory";

describe("FrameFactory", () => {
  describe(".startFrame", () => {
    it("returns a new frame", () => {
      expect(new FrameFactoryImpl().startFrame(1)).toBeInstanceOf(FrameImpl);
    });
    it("returns a final frame on last round", () => {
      expect(new FrameFactoryImpl().startFrame(10)).toBeInstanceOf(FinalFrameImpl);
    });
  });
});
