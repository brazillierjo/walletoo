import { IOperation } from "./operationInterface";

export interface IUser {
  email: string;
  fullName: string;
  avatar: string;
  isSubscribed: boolean;
  incomes: IOperation[];
  expenses: IOperation[];
  lang: string;
  currency: {
    name: string;
    symbol: string;
  };
  operationFormat: string;
  createdAt: Date;
}
