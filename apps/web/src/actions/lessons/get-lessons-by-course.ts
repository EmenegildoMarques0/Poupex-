import type { Lesson } from "@/@types/lesson.types"

export async function getLessonsByCourse(courseId: string): Promise<{ success: boolean; data: Lesson[] }> {
    // Mock data - replace with actual API call
    return {
        success: true,
        data: [
            {
                id: 1,
                course_id: Number.parseInt(courseId),
                title: "Introdução ao curso",
                link: "https://example.com/video1",
                description: "Visão geral do que você vai aprender neste curso",
                supporting_materials: ["materials/slides-intro.pdf", "materials/code-examples.zip"],
                order: 1,
                created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                id: 2,
                course_id: Number.parseInt(courseId),
                title: "Configurando o ambiente",
                link: "https://example.com/video2",
                description: "Instalação e configuração das ferramentas necessárias",
                supporting_materials: ["materials/setup-guide.pdf"],
                order: 2,
                created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                id: 3,
                course_id: Number.parseInt(courseId),
                title: "Primeiro projeto prático",
                link: "https://example.com/video3",
                description: "Vamos construir nosso primeiro projeto juntos",
                supporting_materials: [],
                order: 3,
                created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            },
        ],
    }
}
