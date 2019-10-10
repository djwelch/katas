import { Frame } from "./frame";
import { FrameFactory } from "./frame-factory";
import { InvalidRollError } from "./invalid-roll-error";
import { NotImplementedError } from "./not-implemented-error";

export class Game {
  private completed = false;
  private frames = [this.factory.startFrame(1)];
  private get currentFrame() {
    return this.frames[this.frames.length - 1];
  }

  constructor(private factory: FrameFactory) {}

  roll(pins: number) {
    if (this.completed) throw new InvalidRollError();
    if (this.currentFrame.roll(pins)) {
      if (this.frames.length === 10) {
        this.completed = true;
      } else {
        this.frames.push(this.factory.startFrame(this.frames.length + 1));
      }
    }
  }

  get score(): number {
    throw new NotImplementedError();
  }
}
