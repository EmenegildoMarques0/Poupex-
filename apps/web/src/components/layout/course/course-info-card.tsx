import { Course } from "@/core/schemas/course";
import { BookOpen } from "lucide-react";
import Image from "next/image";

interface CourseInfoCardProps {
    data: Course;
}

export function CourseInfoCard({ data }: CourseInfoCardProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="relative w-full h-56 md:h-64 rounded-xl overflow-hidden border">
                <Image
                    src={data.thumbnail ?? "/images/placeholder.svg"}
                    alt={data.title}
                    fill
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-md">
                    <h1 className="text-2xl font-bold leading-tight">{data.title}</h1>
                    <p className="text-sm text-gray-200 line-clamp-2">{data.description}</p>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-primary" />
                    <span>
                        {data.lessons_count}{" "}
                        {data.lessons_count === 1 ? "Aula" : "Aulas"}
                    </span>
                </div>
                <span className="capitalize">{data.level}</span>
            </div>
        </div>
    );
}
