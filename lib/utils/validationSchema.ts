import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email({ message: "Email invalide" }).min(1, { message: "L'email est requis" }),
    password: z
        .string()
        .min(8, { message: "Le mot de passe doit avoir au moins 8 caractères" })
        .min(1, { message: "Le mot de passe est requis" }),
});

export type SignInInputs = z.infer<typeof signInSchema>;

export const signUpSchema = z
    .object({
        email: z.string().email({ message: "Email invalide" }).min(1, { message: "L'email est requis" }),
        password: z
            .string()
            .min(8, { message: "Le mot de passe doit avoir au moins 8 caractères" })
            .min(1, { message: "Le mot de passe est requis" }),
        passwordConfirmation: z.string().min(1, { message: "La confirmation du mot de passe est requise" }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Les mots de passe ne correspondent pas",
        path: ["passwordConfirmation"],
    });

export type SignUpInputs = z.infer<typeof signUpSchema>;
