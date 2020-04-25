import { MarsRover, Command } from '../mars-rover';

describe('MarsRover', () => {
  let obstacles: Set<string>;
  beforeEach(() => {
    obstacles = new Set<string>();
  });
  describe('from the origin', () => {
    it('does nothing if given nothing to do', () => {
      expect(new MarsRover(obstacles).execute([])).toBe('0:0:N');
    });

    it.each([
      ['M', '0:1:N'],
      ['MM', '0:2:N'],
      ['MMM', '0:3:N'],
      ['R', '0:0:E'],
      ['RR', '0:0:S'],
      ['RRR', '0:0:W'],
      ['RRRR', '0:0:N'],
      ['L', '0:0:W'],
      ['LL', '0:0:S'],
      ['LLL', '0:0:E'],
      ['LLLL', '0:0:N'],
      ['MR', '0:1:E'],
      ['RM', '1:0:E'],
      ['MMMMMMMMMM', '0:0:N'],
      ['RMMMMMMMMMM', '0:0:E'],
      ['LM', '9:0:W'],
      ['LMM', '8:0:W'],
      ['LLM', '0:9:S'],
      ['LLMM', '0:8:S'],
      ['MRMLMMLMRRMM', '2:3:E']
    ])('the %s commands move the rover to %s', (commands: string, expectedLocation: string) => {
      expect(new MarsRover(obstacles).execute(Array.from(commands) as Command[])).toBe(expectedLocation);
    });

    describe('a grid with obstacles at 0:2', () => {
      beforeEach(() => {
        obstacles.add('0:2');
      });

      it('does not move past the obstacle', () => {
        expect(new MarsRover(obstacles).execute(Array.from('M') as Command[])).toBe('0:1:N');
        expect(new MarsRover(obstacles).execute(Array.from('MM') as Command[])).toBe('o:0:1:N');
        expect(new MarsRover(obstacles).execute(Array.from('MMM') as Command[])).toBe('o:0:1:N');
      });
    });
  });
});
