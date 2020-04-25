import { Grid } from './grid';
import { Position } from './position';

export class Dimensions {
  constructor(private width: number, private height: number) {}

  toGrid(): Grid {
    const grid: Grid = {};
    for (const { x, y } of this.positions()) {
      const row = (grid[y] = grid[y] || {});
      row[x] = 0;
    }
    return grid;
  }

  *positions(): IterableIterator<Position> {
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        yield { x, y };
      }
    }
  }
}
