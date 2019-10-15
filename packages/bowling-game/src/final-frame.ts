import { Frame } from "./frame";

export class FinalFrame implements Frame {
  private pinsLeft = 10;
  private rollsLeft = 2;
  private maxRolls = 3;
  public rolls: number[] = [];

  roll(pins: number): boolean {
    if (this.pinsLeft < pins) throw new Error("Invalid Roll");
    if (this.rollsLeft === 0) throw new Error("Invalid Roll");
    this.maxRolls -= 1;
    this.rollsLeft -= 1;
    this.pinsLeft -= pins;
    this.rolls.push(pins);
    if (this.pinsLeft === 0) {
      this.pinsLeft = 10;
      this.rollsLeft = Math.min(this.maxRolls, this.rollsLeft + 1);
    }
    return this.rollsLeft === 0;
  }

  score(_: number[]): number {
    return this.rolls.reduce((sum, pins) => sum + pins, 0);
  }
}
