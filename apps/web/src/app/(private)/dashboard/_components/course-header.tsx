import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import type { Course } from "@/@types/courses.type"

const levelLabels = {
    beginner: "Iniciante",
    intermediate: "Intermediário",
    advanced: "Avançado",
}

interface CourseHeaderProps {
    course: Course
}

export function CourseHeader({ course }: CourseHeaderProps) {
    return (
        <div className="border-b bg-card">
            <div className="flex items-center gap-4 p-6">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/overview">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold tracking-tight truncate">{course.title}</h1>
                        <div className="flex gap-2 flex-shrink-0">
                            <Badge variant="outline">{levelLabels[course.level]}</Badge>
                            {course.is_public ? (
                                <Badge variant="default" className="gap-1">
                                    <Eye className="h-3 w-3" />
                                    Público
                                </Badge>
                            ) : (
                                <Badge variant="secondary" className="gap-1">
                                    <EyeOff className="h-3 w-3" />
                                    Privado
                                </Badge>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{course.description}</p>
                </div>
            </div>
        </div>
    )
}
