"use server";

import { revalidateTag } from "next/cache";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export async function deleteCostAction(id: string | number, token: string) {
    if (!token) {
        console.error("Não autenticado");
        return; 
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
            throw new Error(`Erro ${res.status}: ${errorText}`);
        }

        revalidateTag("get-costs")
        return { success: true };
    } catch (error) {
        console.error("Erro ao deletar gasto:", error);
        return { success: false, error: "Erro ao deletar gasto" };
    }
}
