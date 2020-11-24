import { parse } from "../parse";

describe("parse", () => {
  it("returns error on empty input", () => {
    const ast = parse("");
    expect(ast).toMatchObject({ success: false });
  });

  it.each([
    ["0", 0],
    ["3", 3],
    ["90", 90],
    ["01", 1],
    ["12345678", 12345678],
    ["1+1", 2],
  ])("returns ast", (input: string, match: number) => {
    const ast = parse(input);
    expect(ast).toMatchObject({ success: true, match, rest: [] });
  });
});
