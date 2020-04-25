import { HasHeading } from './mars-rover';
import { Heading } from './heading';

export class Direction implements HasHeading {
  private readonly circle = [Heading.N, Heading.E, Heading.S, Heading.W];
  private circleIndex = 0;

  toString(): string {
    return this.heading;
  }

  public get heading(): Heading {
    return this.circle[this.circleIndex];
  }

  turnRight(): void {
    this.circleIndex = (this.circleIndex + 1) % 4;
  }

  turnLeft(): void {
    this.circleIndex = (this.circleIndex + 3) % 4;
  }
}
