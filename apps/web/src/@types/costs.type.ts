export interface Costs {
    id: string;
    category: string;
    description: string;
    value: number;
    created_at: string;
}

import { z } from "zod"
const costsFormSchema = z.object({
    category: z.string(),
    description: z.string(),
    value: z.number().int().min(0).refine((v) => {
        // valor monetário
        return v;
    }),
    date: z.string().date(),
});

export type CostsFormValues = z.infer<typeof costsFormSchema>
