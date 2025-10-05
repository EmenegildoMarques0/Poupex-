"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface LessonFormProps {
    courseId: number
    nextOrder: number
}

export function LessonForm({ courseId, nextOrder }: LessonFormProps) {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [materials, setMaterials] = useState<string[]>([])
    const [newMaterial, setNewMaterial] = useState("")
    const router = useRouter()

    const addMaterial = () => {
        if (newMaterial.trim()) {
            setMaterials([...materials, newMaterial.trim()])
            setNewMaterial("")
        }
    }

    const removeMaterial = (index: number) => {
        setMaterials(materials.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            course_id: courseId,
            title: formData.get("title") as string,
            link: formData.get("link") as string,
            description: (formData.get("description") as string) || "",
            supporting_materials: materials,
            order: Number(formData.get("order")),
        }

        console.log("[v0] Creating lesson:", data)

        // TODO: Replace with actual API call
        // await createLesson(data)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setIsSubmitting(false)
        setOpen(false)
        setMaterials([])
        router.refresh()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Adicionar Aula
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Nova Aula</DialogTitle>
                        <DialogDescription>Adicione uma nova aula ao curso. Preencha os campos abaixo.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">
                                Título da Aula <span className="text-destructive">*</span>
                            </Label>
                            <Input id="title" name="title" placeholder="Ex: Introdução ao React" required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="link">
                                Link da Aula <span className="text-destructive">*</span>
                            </Label>
                            <Input id="link" name="link" type="url" placeholder="https://exemplo.com/aula" required />
                            <p className="text-xs text-muted-foreground">URL do conteúdo da aula (vídeo, documento, etc.)</p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Descreva o conteúdo da aula... (opcional)"
                                rows={3}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Materiais de Apoio</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={newMaterial}
                                    onChange={(e: { target: { value: React.SetStateAction<string> } }) => setNewMaterial(e.target.value)}
                                    placeholder="URL do material (PDF, documento, etc.)"
                                    onKeyDown={(e: { key: string; preventDefault: () => void }) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault()
                                            addMaterial()
                                        }
                                    }}
                                />
                                <Button type="button" onClick={addMaterial} variant="outline" size="icon">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            {materials.length > 0 && (
                                <div className="space-y-2 mt-2">
                                    {materials.map((material, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm bg-muted p-2 rounded">
                                            <span className="flex-1 truncate">{material}</span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => removeMaterial(index)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <p className="text-xs text-muted-foreground">Adicione links para materiais complementares (opcional)</p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="order">
                                Ordem <span className="text-destructive">*</span>
                            </Label>
                            <Input id="order" name="order" type="number" min="1" defaultValue={nextOrder} required />
                            <p className="text-xs text-muted-foreground">Posição da aula na sequência do curso</p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Criando..." : "Criar Aula"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
