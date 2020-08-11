import { Game } from "../src/game";
import { Player } from "../src/player";
import { Position } from "../src/position";
import { Outcome } from "../src/outcome";

describe("The Tic-tac-toe game", () => {
  const move = (game: Game, player: Player, position: Position): void => {
    expect(game.turn).toBe(player);
    expect(game.outcome).toBe(Outcome.None);
    game.move(position);
  };

  it("can be played", () => {
    const game = new Game();
    move(game, Player.X, 5);
    move(game, Player.O, 1);
    move(game, Player.X, 9);
    move(game, Player.O, 3);
    move(game, Player.X, 2);
    move(game, Player.O, 8);
    move(game, Player.X, 4);
    move(game, Player.O, 6);

    expect(game.outcome).toBe(Outcome.Draw);
  });
});

// O X O
// X X O
// 7 O X
