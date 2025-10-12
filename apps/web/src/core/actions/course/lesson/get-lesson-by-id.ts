"use server";

import { type ApiResponse, ResponseMapper } from "@/core/schemas/default.meppers";
import { env } from "@/lib/env";
import { cookies } from "next/headers";
import  type { Lesson } from "@/core/schemas/course/lesson.schema";

export async function getLessonByIdAction(courseId: string, lessonId: string): Promise<ApiResponse<Lesson>> {
    if (!courseId) {
        return ResponseMapper.error("Course Id do curso é obrigatório.");
    }

    if (!lessonId) {
        return ResponseMapper.error("Lesson Id do curso é obrigatório.");
    }
    try {
        const storage = await cookies();
        const token = storage.get("ppx-auth.session-token");

        if (!token) {
            return ResponseMapper.error("Precisa estar autenticado.");
        }

        const { NEXT_PUBLIC_API_URL: API_URL } = env;

        const response = await fetch(`${API_URL}/api/v1/courses/${courseId}/lessons/${lessonId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token.value}`,
                "Content-Type": "application/json",
            }
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            const msg = data?.message ?? "Falha ao carregar curso.";
            return ResponseMapper.error(msg);
        }

        const courses = Array.isArray(data) ? data : data ?? [];

        return ResponseMapper.success(courses, "Cursos carregados com sucesso.");
    } catch (error) {
        console.error("❌ Erro inesperado ao carregar cursos:", error);
        return ResponseMapper.error("Erro inesperado ao carregar cursos.");
    }
}
