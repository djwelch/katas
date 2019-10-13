import { FinalFrameImpl } from "./final-frame";
import { FrameImpl } from "./frame";
import { Frame, FrameFactory } from "./interfaces";

export class FrameFactoryImpl implements FrameFactory {
  startFrame(frame: number): Frame {
    if (frame === 10) {
      return new FinalFrameImpl();
    }
    return new FrameImpl();
  }
}
