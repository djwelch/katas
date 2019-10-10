import { NotImplementedError } from "./not-implemented-error";

export interface DateFormatter {
  formatDate(date: Date): string;
}

export class DateFormatterImpl implements DateFormatter {
  formatDate(date: Date): string {
    return `${date.getFullYear()}-${this.pad(date.getMonth())}-${this.pad(date.getDate())}`;
  }

  private pad(x: number): string {
    return x.toString().padStart(2, "0");
  }
}
