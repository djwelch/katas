import { HasHeading } from './mars-rover';
import { Position } from './position';

export class Location {
  private position = new Position(0, 0);
  private collision = false;

  constructor(private dimensions: { width: number; height: number }, private obstacles: Set<string>) {}

  move(direction: HasHeading): void {
    const newPosition = this.position.offsetBy(direction.heading).wrap(this.dimensions);
    this.collision = this.obstacles.has(newPosition.toString());
    if (!this.collision) {
      this.position = newPosition;
    }
  }

  toString(): string {
    return this.collisionPrefix() + this.position.toString();
  }

  private collisionPrefix(): string {
    return this.collision ? 'o:' : '';
  }
}
