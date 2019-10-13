import { MockFrameFactory } from "../src/__tests__/_mocks";
import { FrameFactoryImpl } from "../src/frame-factory";
import { Game } from "../src/game";

describe("The bowling game feature", () => {
  const STRIKE = 10;
  it("can get the correct score at the end of a perfect game", () => {
    const game = new Game(new FrameFactoryImpl());
    for (let frame = 0; frame < 10; ++frame) {
      game.roll(STRIKE);
    }
    game.roll(STRIKE);
    game.roll(STRIKE);
    expect(game.score()).toBe(300);
  });
});
