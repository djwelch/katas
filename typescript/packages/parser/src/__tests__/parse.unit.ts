import { parse, Expr } from "../parse";

describe("parse", () => {
  it("returns error on empty input", () => {
    const ast = parse("");
    expect(ast).toMatchObject({ success: false });
  });

  it.each([
    ["0", 0],
    ["1", 1],
  ])("returns ast", (input: string, match: Expr) => {
    const ast = parse(input);
    expect(ast).toMatchObject({ success: true, match, rest: [] });
  });
});
