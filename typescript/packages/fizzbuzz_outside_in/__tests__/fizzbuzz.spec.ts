import { MockConsolePrinter } from "./_mocks";
import { FizzBuzz } from "../src/fizzbuzz";

describe("The FizzBuzz game", () => {
  it("should be played correctly", () => {
    const printer = new MockConsolePrinter();
    const fizzBuzz = new FizzBuzz(printer);

    fizzBuzz.play();

    expect(printer.printLine).nthCalledWith(1, "1");
    expect(printer.printLine).nthCalledWith(2, "2");
    expect(printer.printLine).nthCalledWith(3, "Fizz");
    expect(printer.printLine).nthCalledWith(4, "4");
    expect(printer.printLine).nthCalledWith(5, "Buzz");
    expect(printer.printLine).nthCalledWith(6, "Fizz");
    expect(printer.printLine).nthCalledWith(7, "7");
    expect(printer.printLine).nthCalledWith(8, "8");
    expect(printer.printLine).nthCalledWith(9, "Fizz");
    expect(printer.printLine).nthCalledWith(10, "Buzz");
    expect(printer.printLine).nthCalledWith(11, "11");
    expect(printer.printLine).nthCalledWith(12, "Fizz");
    expect(printer.printLine).nthCalledWith(13, "13");
    expect(printer.printLine).nthCalledWith(14, "14");
    expect(printer.printLine).nthCalledWith(15, "Fizz Buzz");
  });
});
