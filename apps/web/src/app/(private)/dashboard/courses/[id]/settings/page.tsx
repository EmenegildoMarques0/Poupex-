import { getCourseById } from "@/actions/courses/get-course-by-id"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { CourseSettingsForm } from "../../../_components/forms/course-settings-form"
import { DeleteCourseSection } from "../../../_components/forms/delete-course-section"

interface CourseSettingsPageProps {
    params: {
        id: string
    }
}

export default async function CourseSettingsPage({ params }: CourseSettingsPageProps) {
    const course = await getCourseById(params.id)

    if (!course.success) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Definições do Curso</h2>
                <p className="text-muted-foreground">Gerencie as configurações e informações do curso</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Informações Gerais</CardTitle>
                    <CardDescription>Atualize o título, descrição e outras informações do curso</CardDescription>
                </CardHeader>
                <CardContent>
                    <CourseSettingsForm course={course.data} />
                </CardContent>
            </Card>

            <DeleteCourseSection courseId={params.id} courseTitle={course.data.title} />
        </div>
    )
}
