import { Heading } from './heading';

export class Position {
  private readonly offsets = {
    N: { x: 0, y: 1 },
    E: { x: 1, y: 0 },
    S: { x: 0, y: 9 },
    W: { x: 9, y: 0 }
  };

  constructor(private x: number, private y: number) {}

  offsetBy(heading: Heading): Position {
    const { x, y } = this.offsets[heading];
    return new Position(this.x + x, this.y + y);
  }

  wrap({ width, height }: { width: number; height: number }): Position {
    return new Position(this.x % width, this.y % height);
  }

  toString(): string {
    return `${this.x}:${this.y}`;
  }
}
