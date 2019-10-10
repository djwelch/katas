import { NotImplementedError } from "./not-implemented-error";

export class DateProvider {
  getDate(): Date {
    throw new NotImplementedError();
  }
}
