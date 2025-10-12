"use client"

import type React from "react"

import { memo, useState, useMemo, useCallback } from "react"
import Link from "next/link"
import { Search, ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { course } from "@/core/actions/course"


interface CourseSelectorProps {
    currentCourseId: string | null
    isMobile?: boolean
    onCourseChange?: () => void
}

export const HeaderCourseSelector = memo(function CourseSelector({
    currentCourseId,
    isMobile = false,
    onCourseChange,
}: CourseSelectorProps) {
    const { courses } = course.findAllClient()
    const [courseFilter, setCourseFilter] = useState("")

    const currentCourse = useMemo(() => courses.find((c) => c.id === currentCourseId), [courses, currentCourseId])

    const filteredCourses = useMemo(
        () => courses.filter((course) => course.title.toLowerCase().includes(courseFilter.toLowerCase())),
        [courses, courseFilter],
    )

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCourseFilter(e.target.value)
    }, [])

    const handleCourseClick = useCallback(() => {
        setCourseFilter("")
        onCourseChange?.()
    }, [onCourseChange])

    if (!currentCourse) return null

    if (isMobile) {
        return (
            <div className="border-t border-border px-4 py-3">
                <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">CURSO ATUAL</p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between bg-transparent">
                            <span className="truncate">{currentCourse.title}</span>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[calc(100vw-2rem)]">
                        <div className="p-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Filtrar cursos..."
                                    value={courseFilter}
                                    onChange={handleFilterChange}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => (
                                    <DropdownMenuItem key={course.id} asChild>
                                        <Link
                                            href={`/courses/${course.id}`}
                                            className="flex items-center justify-between px-3 py-2"
                                            onClick={handleCourseClick}
                                        >
                                            <span className="text-sm">{course.title}</span>
                                            {course.id === currentCourseId && <Check className="h-4 w-4 text-primary" />}
                                        </Link>
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <div className="px-3 py-6 text-center text-sm text-muted-foreground">Nenhum curso encontrado</div>
                            )}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    }

    return (
        <>
            <div className="hidden h-6 w-px bg-border md:block" />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hidden gap-2 px-3 text-sm font-medium hover:bg-accent md:flex">
                        <span className="max-w-[200px] truncate lg:max-w-[300px]">{currentCourse.title}</span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80">
                    <div className="p-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Filtrar cursos..."
                                value={courseFilter}
                                onChange={handleFilterChange}
                                className="pl-9"
                            />
                        </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                                <DropdownMenuItem key={course.id} asChild>
                                    <Link href={`/courses/${course.id}`} className="flex items-center justify-between px-3 py-2">
                                        <span className="text-sm">{course.title}</span>
                                        {course.id === currentCourseId && <Check className="h-4 w-4 text-primary" />}
                                    </Link>
                                </DropdownMenuItem>
                            ))
                        ) : (
                            <div className="px-3 py-6 text-center text-sm text-muted-foreground">Nenhum curso encontrado</div>
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
})
