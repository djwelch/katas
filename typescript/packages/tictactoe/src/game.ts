import { Player } from "./player";
import { Position } from "./position";
import { Outcome } from "./outcome";

export class Game {
  outcome = Outcome.None;
  turn = Player.X;

  move(_position: Position): void {
    this.turn = this.turn === Player.X ? Player.O : Player.X;
  }
}
