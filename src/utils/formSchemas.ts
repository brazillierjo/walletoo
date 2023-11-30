import { z } from "zod";

export const TransactionFormSchema = z.object({
  label: z
    .string()
    .min(2, "Le label doit avoir au moins 2 caractères.")
    .max(25, "Le label ne doit pas dépasser 25 caractères."),
  amount: z.preprocess((arg) => {
    if (typeof arg === "string") {
      return parseFloat(arg.replace(",", "."));
    }
    return arg;
  }, z.number().positive("Le montant doit être un nombre positif.")),
  category: z.string(),
});
