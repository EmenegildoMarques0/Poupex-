"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { course } from "@/core/actions/course"

interface DeleteCourseSectionProps {
    courseId: string
    courseTitle: string
}

export function DeleteCourseSection({ courseId, courseTitle }: DeleteCourseSectionProps) {
    const [confirmText, setConfirmText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (confirmText !== courseTitle) {
            return
        }

        setIsDeleting(true)

        const result = await course.delete(courseId);

        if (!result.success) {
            toast.error(result.error ?? "Curso excluído", {
                description: "O curso foi excluído permanentemente."
            });
            return;
        }

        toast.success(result.message)

        router.push("/");
    }

    return (
        <Card className="border-destructive">
            <CardHeader>
                <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
                <CardDescription>Ações irreversíveis que afetam permanentemente este curso</CardDescription>
            </CardHeader>
            <CardContent>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="gap-2">
                            <Trash2 className="h-4 w-4" />
                            Excluir curso
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                            <AlertDialogDescription className="space-y-3">
                                <p>
                                    Esta ação não pode ser desfeita. Isso excluirá permanentemente o curso <strong>{courseTitle}</strong>{" "}
                                    e todas as suas aulas e materiais associados.
                                </p>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm">
                                        Digite <strong>{courseTitle}</strong> para confirmar:
                                    </Label>
                                    <Input
                                        id="confirm"
                                        value={confirmText}
                                        onChange={(e) => setConfirmText(e.target.value)}
                                        placeholder="Digite o nome do curso"
                                    />
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setConfirmText("")}>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDelete}
                                disabled={confirmText !== courseTitle || isDeleting}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                {isDeleting ? "Excluindo..." : "Excluir permanentemente"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    )
}