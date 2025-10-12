import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Course } from "@/core/schemas/course";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
    data: Course;
}

export function CourseCard({ data: course }: CourseCardProps) {
    return (
        <Link href={`/dashboard/courses/${course.id}`}>
            <Card className="transition-colors hover:bg-accent h-full border-2 p-0 overflow-hidden">
                <CardContent className="p-0 h-full">
                    <div className="relative min-h-20 h-2/3 shadow-card">
                        <Image src="/images/placeholder-course.avif" alt="placeholder of course" fill className="object-cover" />
                        <div className="absolute left-0 -bottom-2 min-h-20 w-full" />
                    </div>
                    <CardFooter className="flex flex-col items-start mt-2 px-2 h-1/3">
                        <span className="text-sm font-semibold line-clamp-1">{course.title}</span>
                        <p className="text-xs text-muted-foreground line-clamp-1">{course.description}</p>
                    </CardFooter>
                </CardContent>
            </Card>
        </Link>
    )
}