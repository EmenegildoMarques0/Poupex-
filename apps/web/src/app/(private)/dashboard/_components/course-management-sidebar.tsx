"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@workspace/ui/lib/utils"
import { BookOpen, Settings, BarChart3, Users, FileText } from "lucide-react"

interface CourseManagementSidebarProps {
    courseId: string
}

const navigationItems = [
    {
        title: "Aulas",
        href: "",
        icon: BookOpen,
    },
    {
        title: "Análises",
        href: "/analytics",
        icon: BarChart3,
    },
    {
        title: "Alunos",
        href: "/students",
        icon: Users,
    },
    {
        title: "Materiais",
        href: "/materials",
        icon: FileText,
    },
    {
        title: "Definições",
        href: "/settings",
        icon: Settings,
    },
]

export function CourseManagementSidebar({ courseId }: CourseManagementSidebarProps) {
    const pathname = usePathname()
    const basePath = `/dashboard/courses/${courseId}`

    return (
        <aside className="w-64 border-r bg-card flex-shrink-0">
            <nav className="p-4 space-y-1">
                {navigationItems.map((item) => {
                    const href = `${basePath}${item.href}`
                    const isActive = pathname === href
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {item.title}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
