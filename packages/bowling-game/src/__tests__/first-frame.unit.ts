import { FirstFrame } from "../first-frame";

describe("FirstFrame", () => {
  let GUTTER_ROLL = 0;
  let SINGLE_PIN = 1;
  let STRIKE = 10;
  let HALFSTRIKE = [5, 5];
  let GUTTER_FRAME = [0, 0];
  let frame: FirstFrame;
  beforeEach(() => {
    frame = new FirstFrame();
  });

  describe(".roll", () => {
    it("completes after rolling a strike", () => {
      const complete = frame.roll(STRIKE);
      expect(complete).toBe(true);
    });

    it("completes on half strike", () => {
      const complete = HALFSTRIKE.map(pins => frame.roll(pins));
      expect(complete).toStrictEqual([false, true]);
    });

    it("can't knock own more pins than there are in one roll", () => {
      expect(() => frame.roll(SINGLE_PIN + STRIKE)).toThrowError();
    });

    it("can't knock own more pins than there are in two rolls", () => {
      frame.roll(SINGLE_PIN);
      expect(() => frame.roll(STRIKE)).toThrowError();
    });

    it("can't roll more than twice", () => {
      frame.roll(SINGLE_PIN);
      frame.roll(SINGLE_PIN);
      expect(() => frame.roll(STRIKE)).toThrowError();
    });
  });
  describe(".score", () => {
    it.each([
      [GUTTER_FRAME, GUTTER_FRAME, 0],
      [[STRIKE], GUTTER_FRAME, 10],
      [HALFSTRIKE, GUTTER_FRAME, 10],
      [[SINGLE_PIN, GUTTER_ROLL], GUTTER_FRAME, 1]
    ])("should score the frame", (rolls: any, nextRolls: any, score: any) => {
      rolls.map((pins: number) => frame.roll(pins));
      expect(frame.score(nextRolls)).toStrictEqual(score);
    });
  });
});
