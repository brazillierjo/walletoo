import { ITransaction } from "./transactionInterface"

export interface IUser {
  email: string
  fullName: string
  avatar: string
  incomes: ITransaction[]
  expenses: ITransaction[]
  currency: {
    name: string
    symbol: string
  }
  transactionFormat: string
  createdAt: Date
}
