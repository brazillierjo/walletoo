import { PartialUserUpdate } from "@/src/mongoDB/userSchema";

export const resetData: PartialUserUpdate = {
  incomes: [],
  expenses: [],
  currency: "EUR",
  operationFormat: "EU",
  temperatureUnit: "Celsius",
  lang: "fr",
  city: "",
  notes: "",
};
