"use server";

import { RegisterCostFormValues } from "@/core/schemas/costs/register-costs.schema";
import { ApiResponse, ResponseMapper } from "@/core/schemas/default.meppers";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export async function updateCostAction(id: string | number, formData: Partial<RegisterCostFormValues>): Promise<ApiResponse<boolean>> {
    const store = await cookies()
    const token = store.get("ppx-auth.session-token")?.value;
    
    if (!token) {
        console.error("Não autenticado");
        return ResponseMapper.error("Não autenticado"); 
    }
    try {
        const res = await fetch(`${API_URL}/costs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                data: formData.data,
                description: formData.description,
                category: formData.category,
                value: formData.value
            }),
            cache: "no-store",
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Erro ${res.status}: ${errorText}`);
        }

        revalidateTag("get-costs")
        return ResponseMapper.success(true);
    } catch (error) {
        console.error("Erro ao actualizar gasto:", error);
        return ResponseMapper.error("Erro ao actualizar gasto")
    }
}
