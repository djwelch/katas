import { Grid } from './grid';
import { Neighbourhood } from './neighbourhood';
import { Position } from './position';
import { LiveOrganism, DeadOrganism } from './organism';

export class Population {
  private readonly Organism = { 0: DeadOrganism, 1: LiveOrganism };

  constructor(private grid: Grid) {}

  at(position: Position): DeadOrganism | LiveOrganism {
    let neighbourhood = 0;
    for (const neighbour of new Neighbourhood(position).neighbours()) {
      neighbourhood += this.cellPopulation(neighbour);
    }
    return new this.Organism[this.cellPopulation(position)](neighbourhood);
  }

  birth(position: Position): void {
    this.grid[position.y][position.x] = 1;
  }

  private cellPopulation(position: Position): 1 | 0 {
    return (this.grid[position.y] || {})[position.x] || 0;
  }
}
