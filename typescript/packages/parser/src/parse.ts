type Failure = { success: false };
type Success<T> = { success: true; match: T; rest: string[] };
export type Result<T> = Success<T> | Failure;

export function parse(expr: string): Result<number> {
  const input = expr.split('');

  const plus = (lhs: number) => {
    return (rhs: number) => {
      return lhs + rhs;
    };
  };
  const halfPlus = bind((lhs) => bind(() => result(plus(lhs)), char('+')), digits);

  const fullPlus = bind(
    (plus) => bind((rhs) => result(plus(rhs)), digits),
    halfPlus
  );

  return orElse(fullPlus, digits)(input);
}

type Parser<T> = (input: string[]) => Result<T>;

const result = <T>(match: T): Parser<T> => {
  return (input: string[]): Result<T> => {
    return { success: true, match, rest: input };
  };
};

const digitsToNumber = (m: number[]) =>
  result(m.reduce((acc, val) => acc * 10 + val));

const bind = <T1, T2>(f: (match: T2) => Parser<T1>, p: Parser<T2>): Parser<T1> => {
  return (input: string[]): Result<T1> => {
    const result1 = p(input);
    if (result1.success) {
      let p2 = f(result1.match);
      return p2(result1.rest);
    }
    return result1;
  };
};

const atLeastOne = <T>(p: Parser<T>): Parser<T[]> => {
  return (input: string[]): Result<T[]> => {
    let result1 = p(input);
    if (!result1.success) return result1;
    const results: Result<T[]> = { ...result1, match: [result1.match] };
    while (true) {
      const r = p(results.rest);
      if (!r.success) break;
      results.match.push(r.match);
      results.rest = r.rest;
    }
    return results;
  };
};

const orElse = <T1, T2>(p1: Parser<T1>, p2: Parser<T2>): Parser<T1 | T2> => {
  return (input: string[]): Result<T1 | T2> => {
    let result1 = p1(input);
    if (result1.success) return result1;
    return p2(input);
  };
};

const oneOf = <T>(parsers: Parser<T>[]): Parser<T> => {
  return parsers.reduce((previousParser, currentParser) =>
    orElse(previousParser, currentParser)
  );
};

const char = (charToMatch: string): Parser<string> => {
  return (input: string[]): Result<string> => {
    const [ch, ...rest] = input;
    if (ch === charToMatch) return { success: true, match: charToMatch, rest };
    return { success: false };
  };
};

const digit = oneOf(
  '0123456789'
    .split('')
    .map((ch) => bind((ch) => result(Number.parseInt(ch)), char(ch)))
);
const digits = bind(digitsToNumber, atLeastOne(digit));
