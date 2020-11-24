import * as expression from "../expression";

describe("Expression", () => {

  it.each([
    ["", { success: false }],
    ["0", { success: true, match: 0, input: [] }],
    ["1", { success: true, match: 1, input: [] }],
    ["2", { success: true, match: 2, input: [] }],
  ] as Array<[string, expression.Result<number>]>)
  ("evaluates", (expr: string, expected: expression.Result<number>) => {
    const actual = expression.evaluate(expr);
    expect(actual).toEqual(expected);
  });

});
