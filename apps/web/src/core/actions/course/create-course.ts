"use server"
import { createCourseSchema, type CreateCourseSchemaValues } from "@/core/schemas/course";
import { type ApiResponse, ResponseMapper } from "@/core/schemas/default.meppers";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function createCourseAction(data: CreateCourseSchemaValues): Promise<ApiResponse<boolean>> {
    const storage = await cookies();
    const token = storage.get("ppx-auth.session-token")?.value;
    if (!token) {
        return ResponseMapper.error("Sessão expirada. Faça login novamente.");
    }

    const parsed = createCourseSchema.safeParse(data);
    if (!parsed.success) {
        return ResponseMapper.error(parsed.error.message);
    }

    try {
        const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

        const response = await fetch(`${API_URL}/courses`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                level: data.level,
                is_public: data.is_public === "public"
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Falha ao criar curso");
        }

        revalidateTag("get-course");
        return ResponseMapper.success(response.ok);
    } catch (error) {
        console.error("❌ Erro ao criar curso:", error);
        return ResponseMapper.error("Erro ao criar o curso. Verifique os dados e tente novamente.");
    }
}