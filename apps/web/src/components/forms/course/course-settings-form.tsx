"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import { toast } from "sonner"
import type { Course } from "@/core/schemas/course"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { course } from "@/core/actions/course"

interface CourseSettingsFormProps {
    defaultValues: Course
}

export function CourseSettingsForm({ defaultValues }: CourseSettingsFormProps) {
    const form = useForm<Course>({
        mode: "all",
        criteriaMode: "firstError",
        defaultValues: {
            title: defaultValues.title ?? "",
            description: defaultValues.description ?? "",
            level: defaultValues.level ?? "beginner",
            is_public: defaultValues.is_public ?? false,
            thumbnail: defaultValues.thumbnail ?? "",
        },
    })

    const onSubmit = async (formData: Course) => {
        const result = await course.update(formData)

        if (!result.success) {
            toast.error(result.error ?? "Curso não atualizado")
            return
        }

        toast.success(result.message ?? "Curso atualizado com sucesso!")
    }

    const thumbnailWatch = form.watch("thumbnail");
    const isDirty = form.formState.isDirty;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título do curso</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Digite o título do curso"
                                    required
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição do curso</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descreva o conteúdo do curso"
                                    rows={4}
                                    required
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        name="level"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nível</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
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
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="is_public"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel htmlFor="is_public" className="text-sm font-medium">
                                            Curso público
                                        </FormLabel>
                                        <p className="text-xs text-muted-foreground">Visível para todos</p>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    name="thumbnail"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Imagem do curso</FormLabel>
                            <FormControl>
                                <div>
                                    <Input
                                        type="url"
                                        placeholder="https://exemplo.com/imagem.jpg"
                                        {...field}
                                    />
                                    {thumbnailWatch && (
                                        <div className="relative w-full h-40 rounded-lg overflow-hidden bg-muted mt-2">
                                            <Image
                                                src={thumbnailWatch || "/placeholder.svg"}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={form.formState.isSubmitting}
                        onClick={() => form.reset(defaultValues)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting || !isDirty}
                        className="text-white"
                    >
                        {form.formState.isSubmitting ? "Salvando..." : "Salvar alterações"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
