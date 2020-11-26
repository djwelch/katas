import { parse } from "../parse";

describe("parse", () => {
  it("returns error on empty input", () => {
    const ast = parse("");
    expect(ast).toMatchObject({ success: false });
  });

  it.each([
    ["0", 0],
    ["3", 3],
    ["9", 9],
    ["12", 12],
    ["45", 45],
    ["123", 123],
    ["3+7", 10],
    ["3+2", 5],
    ["13+2", 15],
    ["1+13", 14],
  ])("returns ast", (input: string, match: number) => {
    const ast = parse(input);
    expect(ast).toMatchObject({ success: true, match, rest: [] });
  });
});
