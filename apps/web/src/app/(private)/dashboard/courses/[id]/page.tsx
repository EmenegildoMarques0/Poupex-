
import { LessonForm } from "@/components/forms/course/lesson-form";
import { LessonsTable } from "@/components/tables/course/lesson-table";
import { Card, CardContent } from "@/components/ui/card";
import { course } from "@/core/actions/course";
import { BookOpen } from "lucide-react";
import { notFound } from "next/navigation";

interface DetailCoursePageProps {
    params: Promise<{ id: string }>
}

export default async function DetailCoursePage({ params }: DetailCoursePageProps) {
    const courseId = await params;
    if (!courseId) {
        notFound()
    }
    const result = await course.lesson.findManyByCourse(courseId.id);

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
                <LessonForm courseId={Number(courseId.id)} nextOrder={lessons.length + 1} />
            </div>

            {lessons.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
                        <h3 className="font-semibold text-xl mb-2">Nenhuma aula ainda</h3>
                        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                            Comece adicionando a primeira aula do curso para disponibilizar conteúdo aos alunos
                        </p>
                        <LessonForm courseId={Number(courseId.id)} nextOrder={1} />
                    </CardContent>
                </Card>
            ) : (
                    <LessonsTable courseId={courseId.id} lessons={lessons} />
            )}
        </div>
    )
}