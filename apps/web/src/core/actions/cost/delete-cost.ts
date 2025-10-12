"use server";

import { ApiResponse, ResponseMapper } from "@/core/schemas/default.meppers";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export async function deleteCostAction(id: string | number): Promise<ApiResponse<boolean>> {
    const store = await cookies()
    const token = store.get("ppx-auth.session-token")?.value;

    if (!token) {
        console.error("Não autenticado");
        return ResponseMapper.error("Não autenticado"); 
    }
    try {
        const res = await fetch(`${API_URL}/costs/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            const errorText = await res.text();
            return ResponseMapper.error(`Erro ${res.status}: ${errorText}`);
        }

        revalidateTag("get-costs")
        return ResponseMapper.success(true)
    } catch (error) {
        console.error("Erro ao deletar gasto:", error);
        return { success: false, error: "Erro ao deletar gasto" };
    }
}
