import { Frame, FrameFactory } from "../interfaces";

export const MockFrameFactory = jest.fn<FrameFactory, any[]>(frame => ({
  startFrame: jest.fn().mockReturnValue(frame)
}));

export const MockFrame = jest.fn<Frame, any[]>(() => ({
  roll: jest.fn(),
  score: jest.fn()
}));
