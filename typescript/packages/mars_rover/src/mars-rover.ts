import { Location } from './location';
import { Direction } from './direction';
import { Heading } from './heading';

export type Command = 'M' | 'R' | 'L';

export interface HasHeading {
   heading: Heading;
}

// tslint:disable-next-line: min-class-cohesion
export class MarsRover {
  private location = new Location({ width: 10, height: 10 }, this.obstacles);
  private direction: Direction = new Direction();

  private handlers = {
    M: (): void => this.location.move(this.direction),
    R: (): void => this.direction.turnRight(),
    L: (): void => this.direction.turnLeft()
  };

  constructor(private obstacles: Set<string>) {}

  execute(commands: Command[]): string {
    for (const command of commands) {
      this.handleCommand(command);
    }
    return this.toString();
  }

  toString(): string {
    return `${this.location}:${this.direction}`;
  }

  private handleCommand(command: Command): void {
    this.handlers[command]();
  }
}
