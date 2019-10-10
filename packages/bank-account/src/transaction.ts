export interface PendingTransaction {
  type: "deposit" | "withdraw";
  amount: number;
}

export interface VerifiedTransaction {
  date: Date;
  amount: number;
}
