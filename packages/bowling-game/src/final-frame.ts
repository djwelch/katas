import { Frame } from "./interfaces";

export class FinalFrameImpl implements Frame {
  private pinsLeft = 10;
  private rollsLeft = 2;
  private maxRolls = 3;

  roll(pins: number): boolean {
    if (this.pinsLeft < pins) throw new Error("Invalid Roll");
    if (this.rollsLeft === 0) throw new Error("Invalid Roll");
    this.maxRolls -= 1;
    this.rollsLeft -= 1;
    this.pinsLeft -= pins;
    if (this.pinsLeft === 0) {
      this.pinsLeft = 10;
      this.rollsLeft = Math.min(this.maxRolls, this.rollsLeft + 1);
    }
    return this.rollsLeft === 0;
  }

  score(nextScores: number[]): number {
    throw new Error("Method not implemented.");
  }
}
