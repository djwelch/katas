/*
The Transformations
({} → nil) no code at all → code that employs nil
(nil → constant)
(constant → constant+) a simple constant to a more complex constant
(constant → scalar) replacing a constant with a variable or an argument
(statement → statements) adding more unconditional statements.
(unconditional → if) splitting the execution path
(scalar → array)
(array → container)
(statement → tail-recursion)
(if → while)
(statement → non-tail-recursion)
(expression → function) replacing an expression with a function or algorithm
(variable → assignment) replacing the value of a variable.
(case) adding a case (or else) to an existing switch or if
Uncle Bob also explicitly stated: "There are likely others".
*/

const enum Direction {
  N = 'N',
  E = 'E',
  S = 'S',
  W = 'W'
}

interface Position {
  x: number;
  y: number;
}

interface State {
  direction: Direction;
  position: Position;
}

abstract class Command {
  protected constructor(protected state: State) {}

  abstract execute(): State;
}

class NullCommand extends Command {
  constructor(state: State) {
    super(state);
  }
  execute(): State {
    return this.state;
  }
}

class MoveCommand extends Command {
  private direction = this.state.direction;
  private x = this.state.position.x;
  private y = this.state.position.y;
  constructor(state: State) {
    super(state);
  }

  execute(): State {
    if (this.direction === Direction.N) return { ...this.state, position: { x: this.x, y: this.y + 1 } };
    if (this.direction === Direction.S) return { ...this.state, position: { x: this.x, y: this.y - 1 } };
    if (this.direction === Direction.E) return { ...this.state, position: { x: this.x + 1, y: this.y } };
    if (this.direction === Direction.W) return { ...this.state, position: { x: this.x - 1, y: this.y } };
    return this.state;
  }
}

class TurnRightCommand extends Command {
  constructor(state: State) {
    super(state);
  }

  execute(): State {
    const { direction } = this.state;
    if (direction === Direction.N) return { ...this.state, direction: Direction.E };
    if (direction === Direction.S) return { ...this.state, direction: Direction.W };
    if (direction === Direction.E) return { ...this.state, direction: Direction.S };
    if (direction === Direction.W) return { ...this.state, direction: Direction.N };
    return this.state;
  }
}

class TurnLeftCommand extends Command {
  constructor(state: State) {
    super(state);
  }

  execute(): State {
    const { direction } = this.state;
    if (direction === Direction.N) return { ...this.state, direction: Direction.W };
    if (direction === Direction.E) return { ...this.state, direction: Direction.N };
    if (direction === Direction.W) return { ...this.state, direction: Direction.S };
    if (direction === Direction.S) return { ...this.state, direction: Direction.E };
    return this.state;
  }
}

abstract class CommandFactory {
  static create(command: string, state: State): Command {
    if (command === 'M') return new MoveCommand(state);
    if (command === 'R') return new TurnRightCommand(state);
    if (command === 'L') return new TurnLeftCommand(state);
    return new NullCommand(state);
  }
}


export class MarsRover {
  private state: State = { position: { x: 0, y: 0 }, direction: Direction.N };

  execute(commands: string): string {
    this.state = commands
      .split('')
      .reduce((state, command) => this.wrap(CommandFactory.create(command, state).execute()), this.state);
    return this.toString();
  }

  private wrap(state: State): State {
    const { x, y } = state.position;
    return { ...state, position: { x: (x + 10) % 10, y: (y + 10) % 10 } };
  }

  private toString(): string {
    return `${this.state.position.x}:${this.state.position.y}:${this.state.direction}`;
  }
}
