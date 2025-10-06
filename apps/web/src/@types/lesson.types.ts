import z from "zod"

export interface Lesson {
    id: number
    course_id: number
    title: string
    link: string // URL to the lesson content
    description: string
    supporting_materials: string[] // Array of material URLs/paths
    order: number
    created_at: string
    updated_at: string
}

export const createLessonSchema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    description: z.string(),
    link: z.string().url("Link inválido"),
    order: z.number().min(1),
    supporting_materials: z.array(z.instanceof(File)).optional(),
})

export type CreateLessonValues = z.infer<typeof createLessonSchema>;