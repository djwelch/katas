type Failure = { success: false };
type Success<T> = { success: true, match: T, rest: string[] };
export type Result<T> = Success<T> | Failure

const base10 = (n: number[]) => result(n.reduce((acc, d) => acc*10+d));
const addition = ([[lhs, _], rhs]: [[number, string], number]) => result(lhs+rhs);

export function parse(expr: string): Result<number> {
  const input = expr.split('');

  const integer = bind(base10, digits);

  const plus = bind(addition, andThen(andThen(integer, char('+')), integer));

  return orElse(plus, integer)(input);
}

type Parser<T> = (input: string[]) => Result<T>;

const result = <T>(match: T): Parser<T> => {
  return (rest: string[]): Result<T> => {
    return { success: true, match, rest };

  }
};

const bind = <T1, T2>(f: (match: T1) => Parser<T2>, p: Parser<T1>): Parser<T2> => {
  return (input: string[]): Result<T2> => {
    const result = p(input);
    if (result.success) {
      const p2 = f(result.match);
      return p2(result.rest);
    }
    return result;
  }
}

const many1 = <T>(p: Parser<T>): Parser<T[]> => {
  return bind(([n, rest]: [T, T[]]) => result([n].concat(...rest)),
              andThen(p, many(p)));
}

const many = <T>(p: Parser<T>): Parser<T[]> => {
  return (input: string[]): Result<T[]> => {
    const result: Result<T[]> = { success: true, match: [], rest: input };
    while (result.success) {
      const r = p(result.rest);
      if (!r.success) break;

      result.success = r.success;
      result.match.push(r.match);
      result.rest = r.rest;
    }
    return result;
  };
};

const andThen = <T1, T2>(p1: Parser<T1>, p2: Parser<T2>): Parser<[T1, T2]> => {
  return (input: string[]): Result<[T1,T2]> => {
    const result1 = p1(input);
    if (result1.success) {
      const result2 = p2(result1.rest);
      if (result2.success) {
        return { success: true, match: [result1.match, result2.match], rest: result2.rest };
      }
    }
    return { success: false };
  };
};

const orElse = <T>(p1: Parser<T>, p2: Parser<T>): Parser<T> => {
  return (input: string[]): Result<T> => {
    const result = p1(input);
    if (result.success) return result;
    return p2(input);
  };
};

const oneOf = <T>(parsers: Parser<T>[]): Parser<T> => {
  return parsers.reduce((parseOneOf, p) => orElse(parseOneOf, p));
};

const char = (charToMatch: string): Parser<string> => {
  return (input: string[]): Result<string> => {
    const [ch, ...rest] = input;
    if (ch === charToMatch) return { success: true, match: ch, rest };
    return { success: false };
  }
}

const digit = oneOf("0123456789".split('')
                    .map(ch => bind((ch) => result(Number.parseInt(ch)), char(ch))));

const digits = many1(digit);

