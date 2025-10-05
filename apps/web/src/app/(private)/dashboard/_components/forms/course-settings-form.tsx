"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Switch } from "@workspace/ui/components/switch"
import type { Course } from "@/@types/courses.type"
import Image from "next/image"
import { toast } from "sonner"

interface CourseSettingsFormProps {
    course: Course
}

export function CourseSettingsForm({ course }: CourseSettingsFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: course.title,
        description: course.description,
        level: course.level,
        is_public: course.is_public,
        thumbnail: course.thumbnail,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // TODO: Implement update course action
        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast("Curso atualizado", {
            description: "As alterações foram salvas com sucesso.",
        })

        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Título do curso</Label>
                <Input
                    id="title"
                    placeholder="Digite o título do curso"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                    id="description"
                    placeholder="Descreva o conteúdo do curso"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="level">Nível</Label>
                    <Select
                        value={formData.level}
                        onValueChange={(value: "beginner" | "intermediate" | "advanced") =>
                            setFormData({ ...formData, level: value })
                        }
                    >
                        <SelectTrigger id="level">
                            <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="beginner">Iniciante</SelectItem>
                            <SelectItem value="intermediate">Intermediário</SelectItem>
                            <SelectItem value="advanced">Avançado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="is_public" className="text-sm font-medium">
                            Curso público
                        </Label>
                        <p className="text-xs text-muted-foreground">Visível para todos</p>
                    </div>
                    <Switch
                        id="is_public"
                        checked={formData.is_public}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="thumbnail">URL da Thumbnail</Label>
                <Input
                    id="thumbnail"
                    type="url"
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                />
                {formData.thumbnail && (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden bg-muted mt-2">
                        <Image src={"/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" disabled={isLoading}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Salvando..." : "Salvar alterações"}
                </Button>
            </div>
        </form>
    )
}
