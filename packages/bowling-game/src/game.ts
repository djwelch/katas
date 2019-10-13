import { Frame, FrameFactory } from "./interfaces";

export class Game {
  private frames: Frame[] = [];
  private completed: boolean = false;
  private currentFrame = this.factory.startFrame(1);

  constructor(private factory: FrameFactory) {}

  roll(pins: number) {
    if (this.completed) throw new Error("Game Completed");
    if (this.currentFrame.roll(pins)) {
      this.frames.push(this.currentFrame);
      this.completed = this.frames.length === 10;
      if (!this.completed) {
        this.currentFrame = this.factory.startFrame(this.frames.length + 1);
      }
    }
  }

  score(): number {
    let nextScores: number[] = [];
    let runningScore = 0;
    for (const frame of this.frames.reverse()) {
      let score = frame.score([...nextScores]);
      runningScore += score;
      if (nextScores.length === 2) nextScores.pop();
      nextScores.unshift(score);
    }
    return runningScore;
  }
}
