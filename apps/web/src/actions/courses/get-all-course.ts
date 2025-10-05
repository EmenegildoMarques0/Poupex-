"use server"

import { Course } from "@/@types/courses.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

interface InvalidFindAllCourses {
    success: false;
    error: string;
}

interface ValidFindAllCourses {
    success: true;
    data: Course[]
}

export async function getAllCourses(): Promise<InvalidFindAllCourses | ValidFindAllCourses> {
    const store = await cookies()
    const token = store.get("ppx-auth.session-token")?.value;

    if (!token) {
        console.error("Não autenticado");
        return {
            success: false,
            error: "Não autenticado"
        };
    }
    try {
        console.log({ token });

        const res = await fetch(`${API_URL}/courses`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: { tags: ["get-courses"] }
        });

        console.log({ res });


        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Erro ${res.status}: ${errorText}`);
        }

        return { success: true, data: res };
    } catch (error) {
        console.error("Erro ao listar cursos:", error);
        return { success: false, error: "Erro ao listar cursos" };
    }
}
