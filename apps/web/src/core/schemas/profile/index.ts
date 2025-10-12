import z from "zod";

export const profileInfoSchema = z.object({
    name: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
    email: z.email({ message: "Informe um email válido" }),
})

export type ProfileInfoValues = z.infer<typeof profileInfoSchema>