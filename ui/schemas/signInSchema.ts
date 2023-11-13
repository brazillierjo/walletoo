import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email({ message: "Email invalide" }).min(1, { message: "L'email est requis" }),
    password: z.string().min(1, { message: "Le mot de passe est requis" }),
});

export default loginSchema;
