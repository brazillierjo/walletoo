import { z } from "zod";

export const TransactionFormSchema = z.object({
    label: z.string().min(2, "Le label doit avoir au moins 2 caractères.").max(25, "Le label ne doit pas dépasser 25 caractères."),
    amount: z
        .string()
        .transform((value) => parseFloat(value.replace(",", ".")))
        .refine((value) => !isNaN(value) && value > 0, {
            message: "Le montant doit être un nombre positif.",
        }),
});
