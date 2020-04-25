import { Position } from './position';

export class Neighbourhood {
  constructor(private position: Position) {}

  *neighbours(): IterableIterator<Position> {
    for (let yOffset = -1; yOffset <= 1; ++yOffset) {
      for (let xOffset = -1; xOffset <= 1; ++xOffset) {
        if (xOffset === 0 && yOffset === 0) continue;
        yield { x: this.position.x + xOffset, y: this.position.y + yOffset };
      }
    }
  }
}
