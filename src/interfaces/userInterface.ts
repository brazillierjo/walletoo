import { IOperation } from "@/src/interfaces/operationInterface";

export interface IUser {
  avatar: string;
  city: string;
  createdAt: Date;
  currency: string;
  email: string;
  expenses: IOperation[];
  fullName: string;
  incomes: IOperation[];
  isSubscribed: boolean;
  lang: string;
  notes: string;
  operationFormat: string;
  temperatureUnit: string;
}
