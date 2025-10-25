import { CourseManagementSidebar } from "@/components/layout/course/course-management-sidebar";

interface CourseLayoutProps {
    children: React.ReactNode
    params: Promise<{
        id: string
    }>
}

export default async function CourseLayout({ children, params }: CourseLayoutProps) {
    const { id } = await params;

    return (
        <div className="flex flex-1 overflow-hidden">
            <CourseManagementSidebar courseId={id} />
            <main className="flex-1 overflow-y-auto p-6 bg-background">{children}</main>
        </div>
    )
}