"use server";

import { RegisterCostFormValues } from "@/@types/validations/register-cost.schema";
import { revalidateTag } from "next/cache";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export async function updateCostAction(id: string | number, formData: Partial<RegisterCostFormValues>, token: string) {
    if (!token) {
        console.error("Não autenticado");
        return; 
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
        return { success: true };
    } catch (error) {
        console.error("Erro ao actualizar gasto:", error);
        return { success: false, error: "Erro ao actualizar gasto" };
    }
}
