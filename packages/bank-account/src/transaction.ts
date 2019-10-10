export interface Transaction {
  type: "deposit" | "withdraw";
  amount: number;
}

export interface VerifiedTransaction extends Transaction {
  date: Date;
}
