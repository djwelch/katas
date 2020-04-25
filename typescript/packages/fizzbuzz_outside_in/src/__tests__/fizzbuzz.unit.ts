import { FizzBuzz } from "../fizzbuzz";
import { MockConsolePrinter } from "../../__tests__/_mocks";

describe("FizzBuzz", () => {
  describe(".play", () => {
    it("prints the numbers when not divisible by 3 or 5", () => {
      const printer = new MockConsolePrinter();
      const fizzBuzz = new FizzBuzz(printer);
      fizzBuzz.play();
      expect(printer.printLine).nthCalledWith(1, "1");
      expect(printer.printLine).nthCalledWith(2, "2");
      expect(printer.printLine).nthCalledWith(4, "4");
      expect(printer.printLine).nthCalledWith(7, "7");
    });

    it("prints fizz when divisible by 3", () => {
      const printer = new MockConsolePrinter();
      const fizzBuzz = new FizzBuzz(printer);
      fizzBuzz.play();
      expect(printer.printLine).nthCalledWith(3*1, "Fizz");
      expect(printer.printLine).nthCalledWith(3*2, "Fizz");
      expect(printer.printLine).nthCalledWith(3*3, "Fizz");
    });

    it("prints fizz when divisible by 5", () => {
      const printer = new MockConsolePrinter();
      const fizzBuzz = new FizzBuzz(printer);
      fizzBuzz.play();
      expect(printer.printLine).nthCalledWith(5*1, "Buzz");
      expect(printer.printLine).nthCalledWith(5*2, "Buzz");
      expect(printer.printLine).nthCalledWith(5*4, "Buzz");
    });

    it("prints fizz when divisible by 3 and 5", () => {
      const printer = new MockConsolePrinter();
      const fizzBuzz = new FizzBuzz(printer);
      fizzBuzz.play();
      expect(printer.printLine).nthCalledWith(5*3*1, "Fizz Buzz");
      expect(printer.printLine).nthCalledWith(5*3*2, "Fizz Buzz");
      expect(printer.printLine).nthCalledWith(5*3*3, "Fizz Buzz");
    });
  });
});
