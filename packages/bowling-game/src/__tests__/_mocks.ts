import { Frame } from "../frame";
import { FrameFactory } from "../frame-factory";

export const MockFrameFactory = jest.fn<FrameFactory, any[]>(frame => ({
  startFrame: jest.fn().mockReturnValue(frame)
}));

export const MockFrame = jest.fn<Frame, any[]>(() => ({
  rolls: [],
  roll: jest.fn(),
  score: jest.fn()
}));
