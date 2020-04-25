export class Vector {
  constructor(public readonly x: number, public readonly y: number) {
  }

  get length2(): number {
    return this.x*this.x + this.y*this.y;
  }

  get length(): number {
    return Math.sqrt(this.length2);
  }

  norm(): Vector {
    return new Vector(this.x/this.length, this.y/this.length);
  }

  subtract(b: Vector): Vector {
    return new Vector(
      this.x - b.x,
      this.y - b.y,
    );
  }

  dotproduct(b: Vector): number {
    return this.x*b.x + b.y*this.y;
  }

  crossproduct(b: Vector): number {
    return this.x*b.y - b.x*this.y;
  }

  toString(): string {
    return `[${this.x},${this.y}]`;
  }
}

