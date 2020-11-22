import { parse } from "../parse";

describe("parse", () => {
  it("returns error on empty input", () => {
    const ast = parse("");
    expect(ast).toMatchObject({ success: false });
  });

  it.each([
    ["0", 0],
    ["10", 10],
    ["987654321", 987654321],
  ])("returns ast", (input: string, match: number) => {
    const ast = parse(input);
    expect(ast).toMatchObject({ success: true, match, rest: [] });
  });
});
