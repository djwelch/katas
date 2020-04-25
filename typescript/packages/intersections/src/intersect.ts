import { Line } from "./line";
import { Circle } from "./circle";

export function intersect(line: Line, circle: Circle): false|number[] {
  const r = circle.radius;
  const origin = circle.center.subtract(line.origin);
  const dir = line.direction.norm();
  const D = dir.crossproduct(origin);
  const d = r*r - D*D;

  if (d >= 0) {
    return [
      origin.dotproduct(dir) - Math.sqrt(d),
      origin.dotproduct(dir) + Math.sqrt(d),
    ];
  }
  return false;
}
