import { Game } from "../src/game";

describe("The bowling game feature", () => {
  it.skip("can get the correct score at the end of a perfect game", () => {
    const game = new Game();
    for (let frame = 0; frame < 10; ++frame) {
      game.roll(10);
    }
    game.roll(10);
    game.roll(10);
    expect(game.score).toBe(300);
  });
});
