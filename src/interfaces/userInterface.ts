import { IOperation } from "./operationInterface";

export interface IUser {
  email: string;
  fullName: string;
  avatar: string;
  incomes: IOperation[];
  expenses: IOperation[];
  currency: {
    name: string;
    symbol: string;
  };
  operationFormat: string;
  createdAt: Date;
}
