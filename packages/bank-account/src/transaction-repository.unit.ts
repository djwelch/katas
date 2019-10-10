import { VerifiedTransaction } from "./transaction";
import { MemoryTransactionRepository } from "./transaction-repository";
import { TransactionVerifier } from "./transaction-verifier";

const MockFactory = jest.fn<TransactionVerifier, any[]>(() => ({
  verify: jest.fn()
}));

describe("MemoryTransactionRepository", () => {
  let factory: TransactionVerifier;
  let repo: MemoryTransactionRepository;
  beforeEach(() => {
    factory = new MockFactory();
    repo = new MemoryTransactionRepository(factory);
  });

  describe(".add", () => {
    it("uses the transaction verifier to store only verified transactions", () => {
      const transaction: VerifiedTransaction = { amount: 1, date: new Date() };
      factory.verify = jest.fn(() => transaction);
      repo.add({ type: "deposit", amount: 1 });
      expect(repo.all()).toStrictEqual([transaction]);
    });
  });
});
