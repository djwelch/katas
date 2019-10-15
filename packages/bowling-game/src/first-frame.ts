import { Frame } from "./frame";

export class FirstFrame implements Frame {
  private pinsLeft = 10;
  private rollCount = 0;
  public rolls: number[] = [];

  roll(pins: number): boolean {
    if (this.pinsLeft < pins) throw new Error("Invalid Roll");
    if (this.rollCount >= 2) throw new Error("Invalid Roll");

    this.rollCount += 1;
    this.pinsLeft -= pins;
    this.rolls.push(pins);
    return this.pinsLeft === 0 || this.rollCount >= 2;
  }

  score(nextScores: number[]): number {
    const score = this.rolls.reduce((sum, pins) => sum + pins, 0);
    if (this.rolls.length === 1 && score === 10) {
      return score + nextScores[0] + nextScores[1];
    } else if (this.rolls.length === 2 && score === 10) {
      return score + nextScores[0];
    }
    return score;
  }
}
