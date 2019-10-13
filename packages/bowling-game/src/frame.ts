import { Frame } from "./interfaces";

export class FrameImpl implements Frame {
  private pinsLeft = 10;
  private rollCount = 0;
  private totalScore = 0;

  roll(pins: number): boolean {
    if (this.pinsLeft < pins) throw new Error("Invalid Roll");
    if (this.rollCount >= 2) throw new Error("Invalid Roll");

    this.rollCount += 1;
    this.pinsLeft -= pins;
    this.totalScore += pins;
    return this.pinsLeft === 0 || this.rollCount >= 2;
  }

  score(nextScores: number[]): number[] {
    if (this.pinsLeft === 0 && this.rollCount === 2) {
      return [this.totalScore + nextScores[0]];
    }
    if (this.pinsLeft === 0 && this.rollCount === 1) {
      return [this.totalScore + nextScores[0] + nextScores[1]];
    }
    return [this.totalScore];
  }
}
