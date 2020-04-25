import { fizzBuzz } from "../fizz-buzz";

describe("FizzBuzz", () => {
  it.each`
   number | expected
   ${1}   | ${"1"}
   ${2}   | ${"2"}
   ${3}   | ${"Fizz"}
   ${4}   | ${"4"}
   ${5}   | ${"Buzz"}
   ${6}   | ${"Fizz"}
   ${7}   | ${"7"}
   ${1*3*5}   | ${"FizzBuzz"}
   ${2*3*5}   | ${"FizzBuzz"}
   ${3*3*5}   | ${"FizzBuzz"}
  `("given $number returns '$expected'", ({number, expected}) => {
    expect(fizzBuzz(number)).toBe(expected);
  });
});
