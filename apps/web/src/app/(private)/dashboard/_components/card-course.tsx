"use client"
import type { Course } from "@/@types/courses.type"
import Image from "next/image"
import { Card, CardContent } from "@workspace/ui//components/card"
import { Badge } from "@workspace/ui//components/badge"
import Link from "next/link"
import { BookOpen } from "lucide-react"
import { usePathname } from "next/navigation"

interface CourseCardProps {
    data: Course
}

const levelConfig = {
    beginner: {
        label: "Iniciante",
        color: "bg-green-500/10 text-green-600 border-green-500/20",
    },
    intermediate: {
        label: "Intermediário",
        color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
    advanced: {
        label: "Avançado",
        color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    },
}

export function CourseCard({ data: course }: CourseCardProps) {
    const pathname = usePathname()
    const lessonsCount = course.lessons?.length || 0
    const levelInfo = levelConfig[course.level]
    return (
        <Link href={`${pathname.includes("dashboard") ? pathname + "/courses" : pathname}/${course.id}`} className="block">
            <Card
                className="group aspect-square w-full overflow-hidden cursor-pointer p-0
                transition-all duration-300 hover:shadow-lg hover:-translate-y-1 
                border-border/50 hover:border-primary/50"
            >
                <CardContent className="p-0 h-full">
                    <div className="relative h-2/3 w-full overflow-hidden bg-muted">
                        <Image
                            src={"/placeholder.svg?height=200&width=200"}
                            alt={course.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-3 right-3">
                            <Badge variant="outline" className={`text-xs backdrop-blur-md border ${levelInfo.color}`}>
                                {levelInfo.label}
                            </Badge>
                        </div>
                        {lessonsCount > 0 && (
                            <div className="absolute bottom-3 left-3 hidden group-hover:flex items-center gap-1.5 text-white text-xs font-medium backdrop-blur-sm bg-black/40 px-2 py-1 rounded-md ">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>
                                    {lessonsCount} {lessonsCount === 1 ? "aula" : "aulas"}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-center px-4 py-2 flex-1">
                        <h3 className="line-clamp-2 font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
                            {course.title}
                        </h3>
                        {course.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{course.description}</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
