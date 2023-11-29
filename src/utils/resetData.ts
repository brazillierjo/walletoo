import { PartialUserUpdate } from "../mongoDB/userSchema"

export const resetData: PartialUserUpdate = {
  incomes: [],
  expenses: [],
  currency: { name: "EUR", symbol: "€" },
  transactionFormat: "EU",
}
