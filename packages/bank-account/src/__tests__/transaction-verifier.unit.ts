import { DateProvider } from "../date-provider";
import { PendingTransaction } from "../transaction";
import { DatedTransactionVerifier } from "../transaction-verifier";

const dateValue = new Date();
const MockProvider = jest.fn<DateProvider, any[]>(() => ({
  getDate: jest.fn(() => dateValue)
}));

describe("TransactionVerifier", () => {
  let date: DateProvider;
  let verifier: DatedTransactionVerifier;
  beforeEach(() => {
    date = new MockProvider();
    verifier = new DatedTransactionVerifier(date);
  });

  describe(".verify", () => {
    it("should verify the withdrawl transactions", () => {
      const transaction: PendingTransaction = { type: "withdraw", amount: 1 };
      const verified = verifier.verify(transaction);
      expect(verified).toStrictEqual({ amount: -1, date: dateValue });
    });

    it("should verify the deposit transactions", () => {
      const transaction: PendingTransaction = { type: "deposit", amount: 1 };
      const verified = verifier.verify(transaction);
      expect(verified).toStrictEqual({ amount: 1, date: dateValue });
    });
  });
});
