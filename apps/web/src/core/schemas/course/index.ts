import z from "zod";
import type { Lesson } from "./lesson.schema";

export interface Course {
    id: string;
    title: string;
    description: string;
    level: "beginner" | "intermediate" | "advanced"
    is_public: boolean;
    thumbnail?: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    lessons_count: number;
    lessons: Lesson[]
}

export const createCourseSchema = z.object({
    title: z.string().min(3, "O título é obrigatório"),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    is_public: z.enum(["public", "private"]),
    description: z.string().max(255, "Máx. 255 caracteres").optional(),
});

export type CreateCourseSchemaValues = z.infer<typeof createCourseSchema>;