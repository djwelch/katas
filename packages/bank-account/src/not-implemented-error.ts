export class NotImplementedError extends Error {
  name = "NotImplementedError";
  constructor() {
    super("Not Implemented");
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
