export interface Frame {
  roll(pins: number): boolean;
  score(nextScores: number[]): number;
  rolls: number[];
}
