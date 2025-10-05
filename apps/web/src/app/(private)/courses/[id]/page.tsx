import { getCourseById } from "@/actions/courses/get-course-by-id";
import { ArrowLeft, PlayCircle, BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CourseInfoCard } from "@/components/course/course-info-card";

interface DetailsCouseProps {
    params: {
        id: string;
    };
}

export default async function DetailsCouse({ params }: DetailsCouseProps) {
    const course = await getCourseById(params.id);

    if (!course.success) {
        notFound();
    }

    const data = course.data;

    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            {/* Header */}
            <header className="flex items-center px-4 h-16 border-b bg-card">
                <Link
                    href="/courses"
                    className="flex items-center gap-2 hover:underline"
                >
                    <ArrowLeft size={18} />
                    <span className="font-medium">Voltar</span>
                </Link>
            </header>

            {/* Course info */}
            <section className="px-6 py-8 max-w-6xl mx-auto">
                <CourseInfoCard data={data} />
            </section>

            {/* Lessons list */}
            <section className="px-6 pb-10 max-w-6xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Conteúdo do curso</h2>

                <div className="space-y-3">
                    {data.lessons.length > 0 ? (
                        data.lessons.map((lesson, index) => (
                            <Link
                                key={lesson.id}
                                href={`/courses/${data.id}/lesson/${lesson.id}`}
                                className="group flex items-center justify-between p-4 rounded-lg border hover:bg-muted transition"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <PlayCircle className="size-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium group-hover:text-primary transition">
                                            {index + 1}. {lesson.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {lesson.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-muted-foreground">Nenhuma aula disponível.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
