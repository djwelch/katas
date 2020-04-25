// tslint:disable: max-classes-per-file
export class LiveOrganism {
  constructor(private neighbourhood: number) {}

  reproduce(): boolean {
    return this.neighbourhood === 2 || this.neighbourhood === 3;
  }
}

export class DeadOrganism {
  constructor(private neighbourhood: number) {}

  reproduce(): boolean {
    return this.neighbourhood === 3;
  }
}
