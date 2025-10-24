"use server"

import { ApiResponse, ResponseMapper } from "@/core/schemas/default.meppers";
import { User } from "@/core/schemas/user";
import { env } from "@/lib/env";
import { cookies } from "next/headers";

export async function findManyUsersAction(): Promise<ApiResponse<User[]>> {
    try {
        const storage = await cookies();
        const token = storage.get("ppx-auth.session-token");

        if (!token) {
            return ResponseMapper.error("Precisa estar autenticado.");
        }

        const { NEXT_PUBLIC_API_URL: API_URL } = env;

        const response = await fetch(`${API_URL}/api/v1/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token.value}`,
                "Content-Type": "application/json",
            },
            next: {
                tags: ["get-user"]
            }
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            const msg = data?.message ?? "Falha ao carregar user.";
            return ResponseMapper.error(msg);
        }

        const users = Array.isArray(data) ? data : data ?? [];

        return ResponseMapper.success(users, "Users carregados com sucesso.");
    } catch (error) {
        console.error("❌ Erro inesperado ao carregar users:", error);
        return ResponseMapper.error("Erro inesperado ao carregar users.");
    }
}