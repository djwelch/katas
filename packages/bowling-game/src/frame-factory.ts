import { Frame } from "./frame";

export interface FrameFactory {
  startFrame(frame: number): Frame;
}
