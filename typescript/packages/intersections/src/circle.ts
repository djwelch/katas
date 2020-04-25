import { Vector } from "./vector";

export class Circle {
  public readonly center: Vector;
  public readonly radius: number;

  constructor(center: Vector, radius: number) {
    this.center = center;
    this.radius = radius;
  }

  toString(): string {
    return `{kind:'circle',center:${this.center},radius:${
      this.radius}}`;
  }
}


