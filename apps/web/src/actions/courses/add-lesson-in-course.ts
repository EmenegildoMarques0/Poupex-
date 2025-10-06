"use server"

import { Lesson } from "@/@types/lesson.types"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`

interface InvalidFindAllCourses {
    success: false
    error: string
}

interface ValidFindAllCourses {
    success: true
    data: Lesson
}

export async function addLessonInCourse(
    courseId: number,
    requestBody: FormData
): Promise<InvalidFindAllCourses | ValidFindAllCourses> {
    const store = await cookies()
    const token = store.get("ppx-auth.session-token")?.value

    if (!token) {
        return {
            success: false,
            error: "Não autenticado",
        }
    }

    try {
        const res = await fetch(`${API_URL}/courses/${courseId}/lessons`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            body: requestBody,
            cache: "no-store",
        })

        if (!res.ok) {
            const errorText = await res.text()
            console.error("❌ API Error:", res.status, errorText)
            throw new Error(`Erro ${res.status}: ${errorText}`)
        }

        const data = await res.json()
        revalidateTag("get-one-lessons")

        return { success: true, data }
    } catch (error) {
        console.error("❌ Error in CREATE-LESSON:", error)
        return { success: false, error: String(error) }
    }

}
