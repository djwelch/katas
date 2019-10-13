export interface Frame {
  roll(pins: number): boolean;
  score(nextScores: number[]): number[];
}

export interface FrameFactory {
  startFrame(frame: number): Frame;
}
