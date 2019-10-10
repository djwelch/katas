import { NotImplementedError } from "./not-implemented-error";

export class DateProvider {
  getDate(): Date {
    return new Date();
  }
}
