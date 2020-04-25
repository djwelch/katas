import { intersect } from "../intersect";
import { Circle } from "../circle";
import { Vector } from "../vector";
import { Line } from "../line";

describe("intersect(line, circle)", () => {
  const circle = new Circle(new Vector(0,0),1.0);
  const smallerCircle = new Circle(new Vector(0,0), 0.99);
  const circleMoved = new Circle(new Vector(1,1),1);

  it.each([
    [new Line(new Vector(0,1), new Vector(0,-1)), circle],
    [new Line(new Vector(0,-1), new Vector(0,1)), circle],
    [new Line(new Vector(1,0), new Vector(-1,0)), circle],
    [new Line(new Vector(-1,0), new Vector(1,0)), circle],
    [new Line(new Vector(-1,-1).norm(), new Vector(1,1)), circle],
    [new Line(new Vector(-1,1).norm(), new Vector(1,-1)), circle],
    [new Line(new Vector(1,0), new Vector(0,1)), circleMoved],
    [new Line(new Vector(1,2), new Vector(0,-1)), circleMoved],
  ])
  ("%s and %s intersect with the first point being zero", (line: Line, circle: Circle) => {
    const [d1, d2] = intersect(line, circle);
    expect(d1).toBeCloseTo(0);
    expect(d2).toBeCloseTo(2);
  });

  it.each([
    [new Line(new Vector(0,1), new Vector(1,0)), circle],
    [new Line(new Vector(0,-1), new Vector(1,0)), circle],
    [new Line(new Vector(1,0), new Vector(0,1)), circle],
    [new Line(new Vector(-1,0), new Vector(0,1)), circle],
    [new Line(new Vector(-1,-1).norm(), new Vector(1,-1)), circle],
  ])
  ("%s and %s are tangent", (line: Line, circle: Circle) => {
    const [d1, d2] = intersect(line, circle);
    expect(d1).toBeCloseTo(0, 7);
    expect(d2).toBeCloseTo(0, 7);
  });

  it.each([
    [new Line(new Vector(0,1), new Vector(1,0)), smallerCircle],
    [new Line(new Vector(0,-1), new Vector(1,0)), smallerCircle],
    [new Line(new Vector(1,0), new Vector(0,1)), smallerCircle],
    [new Line(new Vector(-1,0), new Vector(0,1)), smallerCircle],
    [new Line(new Vector(-1,-1).norm(), new Vector(1,-1)), smallerCircle],
  ])
  ("%s and %s do not intersect", (line: Line, circle: Circle) => {
    expect(intersect(line, circle)).toBe(false);
  });
});

