type Failure = { success: false };
type Success<T> = { success: true, match: T, rest: string[] };
export type Result<T> = Success<T> | Failure

export function parse(expr: string): Result<number> {
  const input = expr.split('');

  const digits = bind((n: number[]) => result(n.reduce((prev, cur) => prev*10+cur)), many1(digit));
  return digits(input);
}

type Parser<T> = (input: string[]) => Result<T>;

const many1 = <T>(p: Parser<T>): Parser<T[]> => {
  return bind(head => bind((many: T[]) => result([head].concat(many)), many(p)), p);
};

const many = <T>(p: Parser<T>): Parser<T[]> => {
  return (input: string[]): Result<T[]> => {
    const results: Result<T[]> = { success: true, match: [], rest: input };
    while(true) {
      const result = p(results.rest);
      if (result.success) {
        results.match.push(result.match);
        results.rest = result.rest
        continue;
      }

      break;
    }
    return results;
  }
};

const oneOf = <T>(...parsers: Parser<T>[]): Parser<T> => {
  return parsers.reduce((prev: Parser<T>, curr: Parser<T>) => orElse(prev, curr));
};

const orElse = <T1, T2>(p1: Parser<T1>, p2: Parser<T2>): Parser<T1 | T2> => {
  return (input: string[]): Result<T1 | T2> => {
    let result1 = p1(input);
    if (result1.success) {
      return result1;
    }
    return p2(input);
  }
};

const result = <T>(value: T): Parser<T> => 
  (rest: string[]): Result<T> => ({ success: true, match: value, rest });

const bind = <T1, T2>(f: (match: T1) => Parser<T2>, p: Parser<T1>): Parser<T2> => {
  return (input: string[]): Result<T2> => {
    const result = p(input);
    if (result.success) {
      return f(result.match)(result.rest);
    }
    return result;
  };
};

const char = (m: string): Parser<string> => {
  return (input: string[]): Result<string> => {
    const [ch, ...rest] = input;
    if (ch === m) {
      return { success: true, match: ch, rest };
    }
    return { success: false };
  }
}

const zero = bind((_) => result<0>(0), char('0'));
const one = bind((_) => result<1>(1), char('1'));
const two = bind((_) => result<2>(2), char('2'));
const three = bind((_) => result<3>(3), char('3'));
const four = bind((_) => result<4>(4), char('4'));
const five = bind((_) => result<5>(5), char('5'));
const six = bind((_) => result<6>(6), char('6'));
const seven = bind((_) => result<7>(7), char('7'));
const eight = bind((_) => result<8>(8), char('8'));
const nine = bind((_) => result<9>(9), char('9'));

const digit = oneOf(zero, one, two, three, four, five, six, seven, eight, nine);

