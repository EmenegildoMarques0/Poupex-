"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreVertical, Trash2, Video, Search, RotateCcw, ExternalLink, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Lesson } from "@/core/schemas/course/lesson.schema"
import { formatDate } from "@/lib/formats/format-date"
import { course } from "@/core/actions/course"

interface LessonsTableProps {
    lessons: Lesson[];
    courseId: string;
}

export function LessonsTable({ lessons, courseId }: LessonsTableProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<"order" | "created_at">("order")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!deletingId) return

        const result = await course.lesson.delete(courseId,deletingId.toString())
        if (result.success) {
            router.refresh()
        }
        setDeletingId(null)
        setIsAlertOpen(false)
    }

    const openDeleteDialog = (id: number) => {
        setDeletingId(id)
        setIsAlertOpen(true)
    }

    const handleReset = () => {
        setSearchQuery("")
        setSortBy("order")
        setSortOrder("asc")
    }

    // Filter lessons
    let filteredLessons = lessons.filter((lesson) => {
        const matchesSearch =
            lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSearch
    })

    // Sort lessons
    filteredLessons = [...filteredLessons].sort((a, b) => {
        let comparison = 0
        if (sortBy === "order") {
            comparison = a.order - b.order
        } else if (sortBy === "created_at") {
            comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        }
        return sortOrder === "asc" ? comparison : -comparison
    })

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Filtrar aulas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleReset} className="gap-2 bg-transparent">
                        <RotateCcw className="h-4 w-4" />
                        Resetar
                    </Button>
                </div>
            </div>

            {/* Selection info */}
            <div className="text-sm text-muted-foreground">
                {filteredLessons.length} de {lessons.length} selecionadas
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[50%]">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSortBy("order")
                                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                                    }}
                                    className="h-8 px-2 -ml-2"
                                >
                                    Aula
                                </Button>
                            </TableHead>
                            <TableHead>Materiais</TableHead>
                            <TableHead>Link</TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSortBy("created_at")
                                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                                    }}
                                    className="h-8 px-2 -ml-2"
                                >
                                    Criada em
                                </Button>
                            </TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredLessons.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                    Nenhuma aula encontrada
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredLessons.map((lesson) => (
                                <TableRow key={lesson.id} className="group">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-16 h-10 rounded bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden">
                                                <div className="text-xs font-medium text-muted-foreground">#{lesson.order}</div>
                                            </div>
                                            <div className="flex-1 min-w-0 max-w-[20rem]">
                                                <p className="font-medium text-sm truncate mb-1">{lesson.title}</p>
                                                {lesson.description && (
                                                    <p className="text-xs text-muted-foreground truncate">{lesson.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {lesson.supporting_materials &&
                                            lesson.supporting_materials.length > 0 ? (
                                            <Badge variant="secondary" className="gap-1">
                                                <FileText className="h-3 w-3" />
                                                {lesson.supporting_materials.length}
                                            </Badge>
                                        ) : (
                                            <span className="text-muted-foreground text-xs">Nenhum</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        <a
                                            href={lesson.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-primary hover:underline"
                                        >
                                            <Video className="h-3.5 w-3.5" />
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground first-letter:uppercase">
                                        {formatDate(lesson.created_at)}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => openDeleteDialog(lesson.id)}
                                                    className="text-destructive focus:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Deletar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Delete confirmation dialog */}
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. A aula será permanentemente deletada.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Deletar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}