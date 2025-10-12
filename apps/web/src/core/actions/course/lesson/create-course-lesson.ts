"use server"
import { createLessonSchema, type CreateLessonSchemaValues } from "@/core/schemas/course/lesson.schema";
import { type ApiResponse, ResponseMapper } from "@/core/schemas/default.meppers";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function createCourseLessonAction(data: CreateLessonSchemaValues & { courseId: string }): Promise<ApiResponse<boolean>> {
    const storage = await cookies();
    const token = storage.get("ppx-auth.session-token")?.value;
    if (!token) {
        return ResponseMapper.error("Sessão expirada. Faça login novamente.");
    }

    const parsed = createLessonSchema.safeParse(data);
    if (!parsed.success) {
        return ResponseMapper.error(parsed.error.message);
    }

    const formData = new FormData();
    formData.append("title", parsed.data.title);
    formData.append("description", parsed.data.description || "");
    formData.append("link", parsed.data.link);
    formData.append("order", String(parsed.data.order));
    //formData.append("is_public", data.is_public);
    //formData.append("thumbnail", file);

    try {
         const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

            const response = await fetch(`${API_URL}/courses/${data.courseId}/lessons`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
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