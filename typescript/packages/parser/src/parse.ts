type Failure = { success: false };
type Success<T> = { success: true; match: T; rest: string[] };
export type Result<T> = Success<T> | Failure;

export type Expr = number | [Expr, Expr, '+'];

export function parse(expr: string): Result<Expr> {
  const input = expr.split('');
  return orElse(one, zero)(input);
}

const failure = (): Failure => ({ success: false });

const success = <T>(match: T): Parser<T> => {
  return (rest: string[]): Success<T> => ({ success: true, match, rest });
};

type Parser<T> = (input: string[]) => Result<T>;

const bind = <T1, T2>(
  f: (match: T2) => Parser<T1>,
  p: Parser<T2>
): Parser<T1> => {
  return (input: string[]): Result<T1> => {
    const result = p(input);
    return result.success ? f(result.match)(result.rest) : result;
  };
};

const orElse = <T1, T2>(p1: Parser<T1>, p2: Parser<T2>) => {
  return (input: string[]): Result<T1 | T2> => {
    const result = p1(input);
    if (result.success) return result;
    return p2(input);
  };
};

const char = (ch: string): Parser<string> => {
  return ([match, ...rest]) => {
    return match == ch ? success(ch)(rest) : failure();
  };
};

const zero = bind((_) => success(0), char('0'));
const one = bind((_) => success(1), char('1'));
