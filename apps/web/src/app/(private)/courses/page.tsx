import { Course } from "@/@types/courses.type";
import { getAllCourses } from "@/actions/courses/get-all-course";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { BookCheck, Clock4, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function CoursePage() {
    const courses = await getAllCourses();

    let currentCoureses = [] as Course[];
    let totalCourses = 0;

    if (courses.success) {
        currentCoureses = courses.data;
        totalCourses = courses.data.length;
    }

    return (
        <div>
            Página de cursos
            <div>
                <h1 className="mb-4">{totalCourses} Cursos para você! 🎉</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {currentCoureses.map((course) => (
                        <Card key={course.id} className="relative border-3 overflow-hidden p-0 group">
                            <CardContent className="p-0">
                                <div className="relative h-20 lg:h-32 bg-neutral-900 overflow-hidden">
                                    <Image src="/placeholder.svg" alt="" fill className="aspect-3/2 object-cover hover:scale-200 transition-all duration-300 ease-in-out" />
                                </div>
                                <div className="w-full p-2">
                                    <Badge className="absolute top-2 right-2 w-fit rounded-sm text-xs text-primary border border-primary/30 bg-primary/20">{course.level}</Badge>
                                    <Link href={`/courses/${course.id}`} className="hidden absolute top-16 lg:top-28 right-3 size-8 group-hover:flex items-center justify-center hover:scale-120 rounded-full bg-primary transition-all duration-300 ease-in-out">
                                        <PlayCircle />
                                    </Link>
                                    <span className="text-sm font-semibold">{course.title}</span>
                                    <p title="Descrição do curso" className="text-xs line-clamp-2 text-neutral-500">{course.description}</p>

                                    <div className="flex items-center gap-2 mt-4">
                                        <div className="flex items-center text-xs">
                                            <Clock4 className="size-4 inline-block mr-1 text-primary" />
                                            <span>23h</span>
                                        </div>
                                        <div className="flex items-center text-xs">
                                            <BookCheck className="size-4 inline-block mr-1 text-primary" />
                                            <span>{course.lessons_count} aulas</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}