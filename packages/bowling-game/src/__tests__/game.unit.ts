import { Game } from "../game";
import { Frame, FrameFactory } from "../interfaces";
import { MockFrame, MockFrameFactory } from "./_mocks";

describe("Game", () => {
  const STRIKE = 10;
  const SPARE = 1;
  const GUTTER = 0;
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
      expect(() => game.roll(STRIKE)).toThrowError();
    });
  });
  describe("score", () => {
    it("single frame with gutter roll just returns zero.", () => {
      frame.score = jest.fn().mockReturnValueOnce(GUTTER);
      game.roll(GUTTER);
      expect(game.score()).toBe(0);
    });
    it("with 2 frames, scoring first frame gets next frames score", () => {
      frame.roll = jest.fn().mockReturnValue(true);
      frame.score = jest
        .fn()
        .mockReturnValueOnce(SPARE)
        .mockReturnValueOnce(GUTTER);
      game.roll(SPARE);
      game.roll(GUTTER);
      game.score();
      expect(frame.score).toHaveBeenNthCalledWith(2, [SPARE]);
    });
    it("with 3 frames, scoring first frame gets next frames score", () => {
      frame.roll = jest.fn().mockReturnValue(true);
      frame.score = jest
        .fn()
        .mockReturnValueOnce(SPARE)
        .mockReturnValueOnce(SPARE)
        .mockReturnValueOnce(GUTTER);
      game.roll(SPARE);
      game.roll(SPARE);
      game.roll(GUTTER);
      game.score();
      expect(frame.score).toHaveBeenNthCalledWith(3, [SPARE, SPARE]);
    });
    it("with 4 frames, scoring first frame gets next frames score", () => {
      frame.roll = jest.fn().mockReturnValue(true);
      frame.score = jest
        .fn()
        .mockReturnValueOnce(SPARE)
        .mockReturnValueOnce(GUTTER)
        .mockReturnValueOnce(SPARE)
        .mockReturnValueOnce(GUTTER);
      game.roll(SPARE);
      game.roll(GUTTER);
      game.roll(SPARE);
      game.roll(GUTTER);
      game.score();
      expect(frame.score).toHaveBeenNthCalledWith(4, [SPARE, GUTTER]);
    });
    it("does not score incomplete frames", () => {
      frame.roll = jest.fn().mockReturnValue(false);
      game.roll(GUTTER);
      game.score();
      expect(frame.score).not.toHaveBeenCalled();
    });
    it("totals each frame", () => {
      frame.roll = jest.fn().mockReturnValue(true);
      frame.score = jest.fn().mockReturnValue(1);
      for (let i = 1; i <= 10; ++i) {
        game.roll(SPARE);
      }
      expect(game.score()).toBe(10);
    });
  });
});
