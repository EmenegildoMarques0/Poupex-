import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpenText, GraduationCap } from "lucide-react";
import type { Course } from "@/core/schemas/course";
import { course } from "@/core/actions/course";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CoursePage() {
    const courses = await course.findAllServer();

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
                    <Card key={course.id} className="p-0 overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative group min-h-44 overflow-hidden">
                                <Image src={"/images/placeholder.svg"} alt={`Banner course ${course.title}`} fill className="object-cover group-hover:scale-125 transition-all duration-200" />
                            </div>
                            <div className="px-4 pt-2">
                                <div className="min-h-20">
                                    <h1 className="text-xl font-bold">{course.title}</h1>
                                    <p className="line-clamp-6 text-sm text-muted-foreground">{course.description}</p>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <BookOpenText className="size-5" />
                                        <span>{course.lessons_count} Aulas</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GraduationCap className="size-5" />
                                        <span>{course.level}</span>
                                    </div>
                                </div>
                            </div>
                            <CardFooter className="p-4">
                                <Button asChild className="w-full text-white">
                                    <Link href={`/courses/${course.id}`}>Vamos começar</Link>
                                </Button>
                            </CardFooter>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
    </div>
    )
}