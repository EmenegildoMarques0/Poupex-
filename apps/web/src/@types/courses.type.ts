import { Lesson } from "./lesson.types";

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
