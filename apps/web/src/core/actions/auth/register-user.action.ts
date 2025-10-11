"use server"

import { registerUserSchema, RegisterUserSchemaValues } from "@/core/schemas/auth/register-user.schema";
import { SignInSchemaValues } from "@/core/schemas/auth/sign-in.schema";
import { ApiResponse, ResponseMapper } from "@/core/schemas/default.meppers";
import { env } from "@/lib/env";

interface RegisterUserResponse {
    message: string;
    user: {
        name: string;
        email: string;
        updated_at: string;
        created_at: string;
        id: number;
    }
}

export async function registerUserAction(data: RegisterUserSchemaValues): Promise<ApiResponse<RegisterUserResponse>> {
    const parsed = registerUserSchema.safeParse(data);
    if (!parsed.success) {
        return ResponseMapper.error(parsed.error.message);
    }

    try {
        const { NEXT_PUBLIC_API_URL: API_URL } = env;

        const response = await fetch(`${API_URL}/api/v1/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: parsed.data.name,
                email: parsed.data.email,
                password: parsed.data.password,
                password_confirmation: parsed.data.passwordConfirmation
            }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            return ResponseMapper.error(data?.message ?? "Verifique os dados e tente novamente.")
        }

        return ResponseMapper.success(data);
    } catch (error) {
        console.error("❌ Erro inesperado no login: ", error);
        return ResponseMapper.error("Erro ao fazer o login");
    }
}