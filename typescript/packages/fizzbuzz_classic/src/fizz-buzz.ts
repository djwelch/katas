export function fizzBuzz(n: number): string {
  const divisibleBy3 = divisibleBy(n, 3);
  const divisibleBy5 = divisibleBy(n, 5);
  return divisibleBy3 && divisibleBy5 ? "FizzBuzz" 
       : divisibleBy3 ? "Fizz" 
       : divisibleBy5 ? "Buzz"
       : n.toString();
}

function divisibleBy(n: number, m: 3|5): boolean {
  return n % m === 0;
}
