import { parse } from "../src/parse";
import { evaluate } from "../src/evaluate";

describe("evaluate", () => {
  it.skip("return the result of an expression", () => {

    const ast = parse("9*4/2+5*6/(2+1)-1*(-1*(1-3))");
    expect(ast).toMatchObject({ success: true });

    let result = evaluate(ast);
    expect(result).toBe(26);

  });
});
