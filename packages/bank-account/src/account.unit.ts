import { Account } from "./account";
import { TransactionRepository } from "./transaction-repository";

const MockRepository = jest.fn<TransactionRepository, any[]>(() => ({
  add: jest.fn()
}));

beforeEach(() => {
  MockRepository.mockClear();
});

describe("Account:", () => {
  describe(".deposit", () => {
    it("adds a deposit transaction to the repository", () => {
      const repo = new MockRepository();
      const account = new Account(repo);
      account.deposit(10);
      expect(repo.add).toBeCalledWith({});
    });
  });
});
