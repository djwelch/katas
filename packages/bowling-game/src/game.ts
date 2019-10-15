import { Frame } from "./frame";
import { FrameFactory } from "./frame-factory";

export class Game {
  private frames: Frame[] = [];
  private completed: boolean = false;
  private currentFrame = this.factory.startFrame(1);

  constructor(private factory: FrameFactory) {}

  roll(pins: number) {
    if (this.completed) throw new Error("Game Completed");
    if (this.currentFrame.roll(pins)) {
      this.frames.unshift(this.currentFrame);
      this.completed = this.frames.length === 10;
      if (!this.completed) {
        this.currentFrame = this.factory.startFrame(this.frames.length + 1);
      }
    }
  }

  score(): number {
    let nextRolls: number[] = [];
    let runningScore = 0;
    for (const frame of this.frames) {
      let score = frame.score(nextRolls);
      runningScore += score;
      nextRolls = [...frame.rolls, ...nextRolls];
    }
    return runningScore;
  }
}
