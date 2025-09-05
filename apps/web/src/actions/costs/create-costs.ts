"use server";
import { RegisterCostFormValues } from "@/@types/validations/register-cost.schema";
import { revalidateTag } from "next/cache";

export async function createCostAction(formData: RegisterCostFormValues, token: string) {
    if (!token) {
        return { error: "Não autenticado" };
    }

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: String(formData.data).split("T")[0],
                description: formData.description,
                category: formData.category,
                value: formData.value,
            }),
            cache: "no-store",
        });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return { error: `Erro ao criar custo (${response.status})` };
        }

        revalidateTag("get-costs")

        return await response.json();
    } catch (err) {
        console.error("Erro de rede em createCost:", err);
        return { error: "Erro ao conectar ao servidor" };
    }
}
