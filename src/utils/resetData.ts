import { PartialUserUpdate } from "@/src/mongoDB/userSchema";

export const resetData: PartialUserUpdate = {
  incomes: [],
  expenses: [],
  currency: { name: "EUR", symbol: "€" },
  operationFormat: "EU",
  lang: "fr",
  city: "",
};
