import { FinalFrame } from "../final-frame";

describe("FinalFrame", () => {
  let GUTTER_ROLL = 0;
  let SINGLE_PIN = 1;
  let STRIKE = 10;
  let HALFSTRIKE = [5, 5];
  let GUTTER_GAME = [0, 0];
  let PERFECT_GAME = [10, 10, 10];
  let frame: FinalFrame;
  beforeEach(() => {
    frame = new FinalFrame();
  });

  describe(".roll", () => {
    it("gutter rolls completes the frame", () => {
      const complete = GUTTER_GAME.map(pins => frame.roll(pins));
      expect(complete).toStrictEqual([false, true]);
    });
    it("perfect rolls completes the frame", () => {
      const complete = PERFECT_GAME.map(pins => frame.roll(pins));
      expect(complete).toStrictEqual([false, false, true]);
    });
    it("completes after a half strike and an extra roll", () => {
      const complete = [...HALFSTRIKE, GUTTER_ROLL].map(pins => frame.roll(pins));
      expect(complete).toStrictEqual([false, false, true]);
    });
    it("throws if more than 3 rolls", () => {
      PERFECT_GAME.map(pins => frame.roll(pins));
      expect(() => frame.roll(GUTTER_ROLL)).toThrow();
    });
    it("throws if roll more than 10 pins", () => {
      expect(() => frame.roll(SINGLE_PIN + STRIKE)).toThrow();
    });
    it("throws if knock down more than 10 pins", () => {
      frame.roll(SINGLE_PIN);
      expect(() => frame.roll(STRIKE)).toThrow();
    });
    it("throws if more than 3 rolls with no strike", () => {
      GUTTER_GAME.map(pins => frame.roll(pins));
      expect(() => frame.roll(SINGLE_PIN)).toThrow();
    });
  });
  describe(".score", () => {
    it.each([
      [GUTTER_GAME, 0],
      [PERFECT_GAME, 30],
      [[...HALFSTRIKE, STRIKE], 20],
      [[SINGLE_PIN, GUTTER_ROLL], 1],
      [[STRIKE, ...HALFSTRIKE], 20]
    ])("should score the frame", (rolls: any, score: any) => {
      rolls.map((pins: number) => frame.roll(pins));
      expect(frame.score([])).toStrictEqual(score);
    });
  });
});
