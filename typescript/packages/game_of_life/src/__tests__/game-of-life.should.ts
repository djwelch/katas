import { GameOfLife } from '../game-of-life';
import { Dimensions } from '../dimensions';

const BLINKER = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 }
];
const CHACHA = [
  { x: 1, y: 3 },

  { x: 3, y: 2 },
  { x: 3, y: 3 },

  { x: 5, y: 1 },
  { x: 5, y: 2 },
  { x: 5, y: 3 },

  { x: 7, y: 2 },
  { x: 7, y: 3 },

  { x: 2, y: 4 },
  { x: 2, y: 5 },

  { x: 4, y: 4 },
  { x: 4, y: 5 },
  { x: 4, y: 6 },

  { x: 6, y: 4 },
  { x: 6, y: 5 },

  { x: 8, y: 4 }
];

const TOAD = [
  { x: 2, y: 1 },
  { x: 2, y: 2 },
  { x: 2, y: 3 },

  { x: 3, y: 2 },
  { x: 3, y: 3 },
  { x: 3, y: 4 }
];

const DECATHALON = [
  { x: 6, y: 6 },
  { x: 7, y: 6 },
  { x: 8, y: 5 },
  { x: 8, y: 7 },
  { x: 9, y: 6 },
  { x: 10, y: 6 },
  { x: 11, y: 6 },
  { x: 12, y: 6 },
  { x: 13, y: 5 },
  { x: 13, y: 7 },
  { x: 14, y: 6 },
  { x: 15, y: 6 }
];

describe('GameOfLife', () => {
  it('can blink', () => {
    const grid = new GameOfLife(new Dimensions(3, 3), BLINKER);
    expectPeriod2(grid);
  });

  it('can chacha', () => {
    const grid = new GameOfLife(new Dimensions(10, 10), CHACHA);
    expectPeriod2(grid);
  });

  it('can toad', () => {
    const grid = new GameOfLife(new Dimensions(5, 5), TOAD);
    expectPeriod2(grid);
  });

  it('can decathalon', () => {
    const grid = new GameOfLife(new Dimensions(30, 20), DECATHALON);
    expectPeriod15(grid);
  });
});

function expectPeriod2(grid: GameOfLife): void {
  const population1 = grid.next();
  const population2 = grid.next();
  const population3 = grid.next();

  expect(population1).not.toEqual(population2);
  expect(population2).not.toEqual(population3);
  expect(population1).toEqual(population3);
}

function expectPeriod15(grid: GameOfLife): void {
  const population1 = grid.next();
  const population2 = grid.next();
  const population3 = grid.next();
  grid.next();
  grid.next();
  grid.next();
  grid.next();
  grid.next();
  grid.next();
  grid.next();
  grid.next();
  grid.next();
  grid.next();
  grid.next();
  grid.next();
  const population16 = grid.next();

  expect(population1).not.toEqual(population2);
  expect(population2).not.toEqual(population3);
  expect(population1).toEqual(population16);
}
