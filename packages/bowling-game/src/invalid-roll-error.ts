export class InvalidRollError extends Error {
  name = "InvalidRollError";
  constructor() {
    super("Invalid Roll");
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
