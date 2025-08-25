import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email({ message: "Informe um email válido" }),
    password: z.string().min(8, { message: "Deve ter no minimo 8 caractes" }),
});

export type SignInSchemaValues = z.infer<typeof signInSchema>;