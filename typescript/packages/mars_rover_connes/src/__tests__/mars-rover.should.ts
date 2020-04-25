import { MarsRover } from '../mars-rover';

describe('MarsRover', () => {
  it.each([
    ['', '0:0:N'],
    ['M', '0:1:N'],
    ['MM', '0:2:N'],
    ['MMM', '0:3:N'],
    ['L', '0:0:W'],
    ['LL', '0:0:S'],
    ['LLL', '0:0:E'],
    ['LLLL', '0:0:N'],
    ['R', '0:0:E'],
    ['RR', '0:0:S'],
    ['RRR', '0:0:W'],
    ['RRRR', '0:0:N'],
    ['RM', '1:0:E'],
    ['RMMLLM', '1:0:W'],
    ['MMRRM', '0:1:S'],
    ['MMMMMMMMMM', '0:0:N'],
    ['RRM', '0:9:S'],
    ['RMMMMMMMMMM', '0:0:E'],
    ['LM', '9:0:W']
  ])('executes "%s" commands and moves to position "%s"', (commands: string, expectedPosition: string) => {
    const actualPosition = new MarsRover().execute(commands);
    expect(actualPosition).toBe(expectedPosition);
  });
});
