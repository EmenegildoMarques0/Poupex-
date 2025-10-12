"use server"

import { ApiResponse, ResponseMapper } from "@/core/schemas/default.meppers";
import { env } from "@/lib/env";
import { cookies } from "next/headers";

export async function signOutAction(): Promise<ApiResponse<boolean>> {
    const storage = await cookies();
    const token = storage.get("ppx-auth.session-token");

    if (!token) {
        return ResponseMapper.error("Precisa estar autenticado.")
    }

    try {
        const { NEXT_PUBLIC_API_URL: API_URL } = env;

        const response = await fetch(`${API_URL}/api/v1/logout`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            return ResponseMapper.error(data?.message ?? "Falha ao terminar a sessão")
        }

        storage.delete("ppx-auth.session-token");
        return ResponseMapper.success(true);
    } catch (error) {
        console.error("❌ Erro inesperado no logout: ", error);
        return ResponseMapper.error("Erro ao fazer o logout");
    }
}