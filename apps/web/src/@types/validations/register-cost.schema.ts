import { z } from "zod";

export const costsFormSchema = z.object({
    category: z
        .string({
            required_error: "A categoria é obrigatória.",
            invalid_type_error: "Categoria deve ser um texto.",
        })
        .min(1, "Informe a categoria."),
        
    description: z
        .string({
            required_error: "A descrição é obrigatória.",
            invalid_type_error: "Descrição deve ser um texto.",
        })
        .min(1, "Informe uma descrição.").max(255),
    
    value: z.coerce
        .number({
            required_error: "O valor é obrigatório.",
            invalid_type_error: "O valor deve ser numérico.",
        })
        .min(0, { message: "O valor deve ser maior ou igual a zero." }),
    
    data: z
        .string({
            required_error: "A data é obrigatória.",
            invalid_type_error: "Data inválida.",
        })
        .refine((val) => !isNaN(Date.parse(val)), "Data inválida."),
});

export type RegisterCostFormValues = z.infer<typeof costsFormSchema>;
