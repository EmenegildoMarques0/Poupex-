"use server"

import { signInSchema, SignInSchemaValues } from "@/core/schemas/auth/sign-in.schema";
import { ApiResponse, ResponseMapper } from "@/core/schemas/default.meppers";
import { env } from "@/lib/env";
import { cookies } from "next/headers";

interface SignInResponse {
    message: string;
    token: string;
}

export async function signInAction(data: SignInSchemaValues): Promise<ApiResponse<SignInResponse>> {
    const parsed = signInSchema.safeParse(data);
    if (!parsed.success) {
        return ResponseMapper.error(parsed.error.message);
    }

    try {
        const { NEXT_PUBLIC_API_URL: API_URL } = env;

        const response = await fetch(`${API_URL}/api/v1/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: parsed.data.email,
                password: parsed.data.password,
            }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            return ResponseMapper.error(data?.message ?? "Email ou senha inválidos")
        }

        const storage = await cookies();
        storage.set("ppx-auth.session-token", data.token, {
            maxAge: 60 * 60 * 1, // 1h
            path: "/"
        });

        return ResponseMapper.success(data);
    } catch (error) {
        console.error("❌ Erro inesperado no login: ", error);
        return ResponseMapper.error("Erro ao fazer o login");
    }
}