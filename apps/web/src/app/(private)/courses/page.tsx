import { Course } from "@/@types/courses.type";
import { getAllCourses } from "@/actions/courses/get-all-course";
import { Card, CardContent } from "@workspace/ui/components/card";
import { GraduationCap } from "lucide-react";
import { CourseCard } from "../dashboard/_components/card-course";

export default async function CoursePage() {
    const courses = await getAllCourses();

    let currentCourses = [] as Course[]
    let totalCourses = 0

    if (courses.success) {
        currentCourses = courses.data
        totalCourses = courses.data.length
    }

    return (<div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Meus Cursos</h1>
                <p className="text-muted-foreground mt-1">
                    {totalCourses > 0
                        ? `${totalCourses} ${totalCourses === 1 ? "curso disponível" : "cursos disponíveis"} para você! 🎉`
                        : "Nenhum curso disponível"}
                </p>
            </div>
        </div>

        {totalCourses === 0 ? (
            <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <GraduationCap className="size-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum curso encontrado</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                        Você ainda não tem cursos cadastrados. Comece criando seu primeiro curso!
                    </p>
                </CardContent>
            </Card>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentCourses.map((course) => (
                    <CourseCard key={course.id} data={course} />
                ))}
            </div>
        )}
    </div>
    )
}