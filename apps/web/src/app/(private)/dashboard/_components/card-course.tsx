"use client"
import type { Course } from "@/@types/courses.type"
import Image from "next/image"
import { Card, CardContent } from "@workspace/ui//components/card"
import { Badge } from "@workspace/ui//components/badge"
import Link from "next/link"

interface CourseCardProps {
    data: Course
}

const levelLabels = {
    beginner: "Iniciante",
    intermediate: "Intermediário",
    advanced: "Avançado",
}

export function CourseCard({ data: course }: CourseCardProps) {
    return (
        <Link href={`/dashboard/courses/${course.id}`} className="block">
            <Card
                className="group aspect-square w-full overflow-hidden cursor-pointer p-0
                transition-all duration-300 hover:shadow-lg hover:-translate-y-1 
                border-border/50 hover:border-primary/50"
            >
                <div className="relative h-2/3 w-full overflow-hidden bg-muted">
                    <Image
                        src={"/placeholder.svg?height=200&width=200"}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Badge variant="secondary" className="text-xs backdrop-blur-sm bg-background/80">
                            {levelLabels[course.level]}
                        </Badge>
                    </div>
                </div>

                <CardContent className="flex flex-col justify-center p-4 h-1/3">
                    <h3 className="line-clamp-2 font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
                        {course.title}
                    </h3>
                    {course.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{course.description}</p>
                    )}
                </CardContent>
            </Card>
        </Link>
    )
}
