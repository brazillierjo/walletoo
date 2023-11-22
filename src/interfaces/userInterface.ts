import { ITransaction } from "./transactionInterface";

export interface IUser {
    email: string;
    fullName: string;
    avatar: string;
    incomes: ITransaction[];
    expenses: ITransaction[];
    currency?: string;
    createdAt: Date;
}
