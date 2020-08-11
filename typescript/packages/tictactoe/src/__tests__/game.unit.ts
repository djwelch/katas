import { Game } from "../game";
import { Player } from "../player";
import { Outcome } from "../outcome";

describe("Game", () => {
  let game: Game;
  beforeEach(() => (game = new Game()));

  describe("After no moves", () => {
    it("X plays first", () => {
      expect(game.turn).toBe(Player.X);
    });
  });

  describe("After the first move", () => {
    beforeEach(() => game.move(1));

    it("O plays next", () => {
      expect(game.turn).toBe(Player.O);
    });
  });

  describe("After the two moves", () => {
    beforeEach(() => {
      game.move(1);
      game.move(2);
    });

    it("X plays next", () => {
      expect(game.turn).toBe(Player.X);
    });
  });

  it("outcome is initially None", () => {
    expect(game.outcome).toBe(Outcome.None);
  });
});

class Client {
  request() {
    return "kjsdf";
  }

  private antohermethod() {}
}

import { generateFromMetadata, getMetadata } from "jest-mock";
const mockClass = <T>(_class: { new (...args: any): T }): jest.Mocked<T> => {
  const metadata = getMetadata(_class as any);
  if (metadata == null) throw new Error("Unable to mock class");
  const Mock = generateFromMetadata(metadata);
  return new Mock() as jest.Mocked<T>;
};

class SomeLogic {
  constructor(private client: Client) {}

  public requestSomething(): string {
    return this.client.request();
  }
}

describe("abc", () => {
  it("def", () => {
    const client = mockClass(Client);
    client.request.mockReturnValue("the response");
    const logic = new SomeLogic(client);
    expect(logic.requestSomething()).toBe("the response");
  });
});
