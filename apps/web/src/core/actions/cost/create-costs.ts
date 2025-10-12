"use server";
import { Costs } from "@/core/schemas/costs";
import { RegisterCostFormValues } from "@/core/schemas/costs/register-costs.schema";
import { ApiResponse, ResponseMapper } from "@/core/schemas/default.meppers";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function createCostAction(formData: RegisterCostFormValues): Promise<ApiResponse<Costs>> {
    const store = await cookies()
    const token = store.get("ppx-auth.session-token")?.value;
    
    if (!token) {
        return ResponseMapper.error("Não autenticado");
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
            return ResponseMapper.error(`Erro ao criar custo (${response.status})`);
        }

        revalidateTag("get-costs")

        return ResponseMapper.success(await response.json());
    } catch (err) {
        console.error("Erro de rede em createCost:", err);
        return ResponseMapper.error("Erro ao conectar ao servidor")
    }
}
