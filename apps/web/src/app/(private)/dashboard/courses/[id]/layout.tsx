import type React from "react"
import { getCourseById } from "@/actions/courses/get-course-by-id"
import { notFound } from "next/navigation"
import { CourseHeader } from "../../_components/course-header"
import { CourseManagementSidebar } from "../../_components/course-management-sidebar"

interface CourseLayoutProps {
    children: React.ReactNode
    params: {
        id: string
    }
}

export default async function CourseLayout({ children, params }: CourseLayoutProps) {
    const course = await getCourseById(params.id)

    if (!course.success) {
        notFound()
    }

    return (
        <div className="flex flex-col h-full">
            <CourseHeader course={course.data} />
            <div className="flex flex-1 overflow-hidden">
                <CourseManagementSidebar courseId={params.id} />
                <main className="flex-1 overflow-y-auto p-6 bg-background">{children}</main>
            </div>
        </div>
    )
}
