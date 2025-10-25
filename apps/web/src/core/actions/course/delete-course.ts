"use server"
import { ApiResponse, ResponseMapper } from "@/core/schemas/default.meppers";
import { env } from "@/lib/env";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function deleteCourseAction(courseId: string): Promise<ApiResponse<boolean>> {
    if (!courseId) {
        return ResponseMapper.error("Id do curso é obrigatório.");
    }

    try {
        const storage = await cookies();
        const token = storage.get("ppx-auth.session-token");

        if (!token) {
            return ResponseMapper.error("Precisa estar autenticado.");
        }

        const { NEXT_PUBLIC_API_URL: API_URL } = env;

        const response = await fetch(`${API_URL}/api/v1/courses/${courseId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            const msg = data?.message ?? "Falha ao deletar curso.";
            return ResponseMapper.error(msg);
        }
        revalidateTag("get-course");
        return ResponseMapper.success(true, "Curso apagado com sucesso")
    } catch (error) {
        console.error("❌ Erro inesperado ao deletar curso:", error);
        return ResponseMapper.error("Erro inesperado ao deletar curso.");
    }
}