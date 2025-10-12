import { z } from "zod";

export const costsFormSchema = z.object({
    category: z
        .string({
            error: "A categoria é obrigatória.",
        })
        .min(1, "Informe a categoria."),
        
    description: z
        .string({
            error: "A descrição é obrigatória.",
        })
        .min(1, "Informe uma descrição.").max(255),
    
    value: z.coerce
        .number({
            error: "O valor é obrigatório.",
        })
        .min(0, { message: "O valor deve ser maior ou igual a zero." }),
    
    data: z
        .string({
            error: "A data é obrigatória.",
        })
        .refine((val) => !isNaN(Date.parse(val)), "Data inválida."),
});

export type RegisterCostFormValues = z.infer<typeof costsFormSchema>;