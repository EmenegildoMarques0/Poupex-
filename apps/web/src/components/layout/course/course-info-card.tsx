
import { Course } from "@/core/schemas/course";
import { BookOpen } from "lucide-react";
import Image from "next/image";

interface CourseInfoCardProps {
    data: Course
}

export function CourseInfoCard({ data }: CourseInfoCardProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative w-full h-56 md:h-64 rounded-xl overflow-hidden border">
                <Image
                    src={"/images/placeholder.svg"}
                    alt={data.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Details */}
            <div className="md:col-span-2 flex flex-col justify-center">
                <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
                <p className="text-muted-foreground mb-4">{data.description}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <BookOpen size={16} />
                        {data.lessons_count} {data.lessons_count === 1 ? "Aula" : "Aulas"}
                    </span>
                    <span className="capitalize">• {data.level}</span>
                </div>
            </div>
        </div>
    )
}