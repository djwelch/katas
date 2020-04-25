import { Vector } from "./vector";

export class Line {
  constructor(public readonly origin: Vector, 
              public readonly direction: Vector) {
  }

  toString(): string {
    return `{kind:'line',origin:${this.origin},direction:${
      this.direction}}`;
  }
}

