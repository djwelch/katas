import { Frame } from "../frame";
import { FrameFactory } from "../frame-factory";
import { Game } from "../game";
import { InvalidRollError } from "../invalid-roll-error";
import { MockFrame, MockFrameFactory } from "./_mocks";

describe("Game", () => {
  const STRIKE = 10;
  let frame: Frame;
  let frameFactory: FrameFactory;
  let game: Game;
  beforeEach(() => {
    frame = new MockFrame();
    frameFactory = new MockFrameFactory(frame);
    game = new Game(frameFactory);
  });

  describe("construction", () => {
    it("starts the first frame", () => {
      expect(frameFactory.startFrame).toBeCalledWith(1);
    });
  });

  describe("roll", () => {
    it("is applied to the current frame", () => {
      game.roll(STRIKE);
      expect(frame.roll).toBeCalledWith(STRIKE);
    });
    it("when a roll completes a frame, the next frame gets created", () => {
      frame.roll = jest.fn().mockReturnValueOnce(true);
      game.roll(STRIKE);
      expect(frameFactory.startFrame).toBeCalledWith(2);
    });
    it("only 10 completed frames are allowed", () => {
      frame.roll = jest.fn().mockReturnValue(true);
      for (let i = 1; i <= 10; ++i) {
        game.roll(STRIKE);
      }
      expect(() => game.roll(STRIKE)).toThrowError(InvalidRollError);
    });
  });
});
