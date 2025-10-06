import { getLessonsByCourse } from "@/actions/lessons/get-lessons-by-course"
import { Card, CardContent } from "@workspace/ui/components/card"
import { BookOpen } from "lucide-react"
import { LessonForm } from "../../_components/forms/lesson-form"
import { LessonsTable } from "../../_components/tables/lessons-table"
import { notFound } from "next/navigation"

interface CourseDetailPageProps {
    params: {
        id: string
    }
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
    if (!params.id) {
        notFound()
    }
    const result = await getLessonsByCourse(params.id);

    if (!result.success) {
        notFound()
    }

    const lessons = result.data;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Aulas do Curso</h2>
                    <p className="text-muted-foreground">Gerencie as aulas e conteúdo do curso</p>
                </div>
                <LessonForm courseId={Number(params.id)} nextOrder={lessons.length + 1} />
            </div>

            {lessons.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
                        <h3 className="font-semibold text-xl mb-2">Nenhuma aula ainda</h3>
                        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                            Comece adicionando a primeira aula do curso para disponibilizar conteúdo aos alunos
                        </p>
                        <LessonForm courseId={Number(params.id)} nextOrder={1} />
                    </CardContent>
                </Card>
            ) : (
                <LessonsTable lessons={lessons} />
            )}
        </div>
    )
}
