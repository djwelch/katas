type Success<T> = { success: true, match: T, input: string[] };
type Failure = { success: false };
export type Result<T> = Success<T> | Failure;

export function evaluate(formula: string): Result<number> {
  let [ch, ...input] = formula.split('');
  let zeroNumber = bind(
    (_: string): Result<number> => { success: true, match: 0, input }, zero);

  zeroNumber(ch, ...input)

  if (result.success) return result;

  result = one(ch, ...input);
  if (result.success) return result;

  result = two(ch, ...input);
  if (result.success) return result;


  return { success: false };
}

type Parser<T> = (ch: string, ...input: string[]) => Result<T>;



const zero = (ch: string, ...input: string[]): Result<string> => 
  ch === "0" ? { success: true, match: ch, input } : { success: false };

const one = (ch: string, ...input: string[]): Result<number> => 
  ch === "1" ? { success: true, match: 1, input } : { success: false };

const two = (ch: string, ...input: string[]): Result<number> => 
  ch === "2" ? { success: true, match: 2, input } : { success: false };

const bind = <T1, T2>(f: (result: T1) => Parser<T2>, p: Parser<T1>): Parser<T2> => {
  return (ch: string, ...input: string[]): Result<T2> => {
    const result1 = p(ch, ...input);
    if (result1.success) {
      const p2 = f(result1.match);
      return p2(ch, ...result1.input);
    } else {
      return result1;
    }
  };
};
