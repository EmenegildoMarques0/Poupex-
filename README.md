# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button"
```


"use client"

import { useRouter } from "next/navigation"
import { Plus, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"

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
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form"

import { addLessonInCourse } from "@/actions/courses/add-lesson-in-course"
import { createLessonSchema, CreateLessonValues } from "@/@types/lesson.types"

interface LessonFormProps {
    courseId: number
    nextOrder: number
}

export function LessonForm({ courseId, nextOrder }: LessonFormProps) {
    const router = useRouter()

    const form = useForm<CreateLessonValues>({
        resolver: zodResolver(createLessonSchema),
        defaultValues: {
            title: "",
            description: "",
            link: "",
            order: nextOrder,
            supporting_materials: [],
        },
    })


    const { fields, append, remove } = useFieldArray<CreateLessonValues, "supporting_materials">({
        control: form.control,
        name: "supporting_materials",
    })



    const onSubmit = async (data: CreateLessonValues) => {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("description", data.description || "")
        formData.append("link", data.link)
        formData.append("order", String(data.order))

        data.supporting_materials.forEach((mat, index) => {
            if (mat.trim()) formData.append(`supporting_materials[${index}]`, mat)
        })

        await addLessonInCourse(courseId, formData)
        router.refresh()
        form.reset({ ...form.getValues(), supporting_materials: [""] })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Adicionar Aula
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Nova Aula</DialogTitle>
                            <DialogDescription>
                                Adicione uma nova aula ao curso. Preencha os campos abaixo.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            {/* Título */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Título da Aula <span className="text-destructive">*</span>
                                        </FormLabel>
                                        <Input placeholder="Ex: Introdução ao React" {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Link */}
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Link da Aula <span className="text-destructive">*</span>
                                        </FormLabel>
                                        <Input type="url" placeholder="https://exemplo.com/aula" {...field} />
                                        <p className="text-xs text-muted-foreground">
                                            URL do conteúdo da aula (vídeo, documento, etc.)
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Descrição */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <Textarea
                                            placeholder="Descreva o conteúdo da aula... (opcional)"
                                            rows={3}
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Materiais de Apoio */}
                            <div className="grid gap-2">
                                <Label>Materiais de Apoio</Label>

                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex items-center gap-2">
                                        <Input
                                            placeholder="URL do material (PDF, documento, etc.)"
                                            {...form.register(`supporting_materials.${index}` as const)}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => remove(index)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 w-fit gap-2"
                                    onClick={() => append("")}
                                >
                                    <Plus className="h-4 w-4" />
                                    Adicionar Material
                                </Button>

                                <p className="text-xs text-muted-foreground">
                                    Adicione links para materiais complementares (opcional)
                                </p>
                            </div>

                            {/* Ordem */}
                            <FormField
                                control={form.control}
                                name="order"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Ordem <span className="text-destructive">*</span>
                                        </FormLabel>
                                        <Input type="number" min={1} {...field} />
                                        <p className="text-xs text-muted-foreground">
                                            Posição da aula na sequência do curso
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit">Criar Aula</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
