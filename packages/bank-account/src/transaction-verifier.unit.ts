import { DateProvider } from "./date-provider";
import { Transaction } from "./transaction";
import { DatedTransactionVerifier } from "./transaction-verifier";

const MockProvider = jest.fn<DateProvider, any[]>(() => ({
  getDate: jest.fn()
}));

describe("TransactionVerifier", () => {
  let date: DateProvider;
  let verifier: DatedTransactionVerifier;
  beforeEach(() => {
    date = new MockProvider();
    verifier = new DatedTransactionVerifier(date);
  });

  describe(".verify", () => {
    it("should date the transactions", () => {
      const dateValue = new Date();
      date.getDate = jest.fn(() => dateValue);
      const transaction: Transaction = { type: "withdraw", amount: 1 };
      const verified = verifier.verify(transaction);
      expect(verified).toStrictEqual({ type: "withdraw", amount: 1, date: dateValue });
    });
  });
});
