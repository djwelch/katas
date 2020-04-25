import { Population } from './population';
import { Dimensions } from './dimensions';
import { Position } from './position';

export class GameOfLife {
  private population: Population;

  constructor(private dimensions: Dimensions, populationPositions: Position[]) {
    this.population = this.initialPopulation(populationPositions);
  }

  private initialPopulation(positions: Position[]): Population {
    const population = new Population(this.dimensions.toGrid());
    positions.forEach(position => population.birth(position));
    return population;
  }

  next(): Population {
    const nextPopulation = new Population(this.dimensions.toGrid());
    for (const position of this.dimensions.positions()) {
      const organism = this.population.at(position);
      if (organism.reproduce()) {
        nextPopulation.birth(position);
      }
    }
    return (this.population = nextPopulation);
  }
}
