import { FinalFrame } from "./final-frame";
import { FirstFrame } from "./first-frame";
import { Frame } from "./frame";

export class FrameFactory {
  startFrame(frame: number): Frame {
    if (frame === 10) {
      return new FinalFrame();
    }
    return new FirstFrame();
  }
}
