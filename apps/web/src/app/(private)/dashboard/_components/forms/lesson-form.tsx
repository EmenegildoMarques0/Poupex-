"use client"
import { createLessonSchema, CreateLessonValues } from "@/@types/lesson.types";
import { addLessonInCourse } from "@/actions/courses/add-lesson-in-course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Plus, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner";

interface LessonFormProps {
    courseId: number
    nextOrder: number
}

export function LessonForm({ courseId, nextOrder }: LessonFormProps) {
    const form = useForm<CreateLessonValues>({
        mode: "all",
        resolver: zodResolver(createLessonSchema),
        defaultValues: {
            title: "",
            link: "",
            description: "",
            order: nextOrder,
            supporting_materials: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "supporting_materials",
        rules: { maxLength: 50 }
    })

    async function onSubmit(data: CreateLessonValues) {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("link", data.link);
        formData.append("order", String(data.order));
        data.supporting_materials?.forEach((file) => {
            if (file instanceof File) {
                formData.append("supporting_materials", file);
            }
        });

        const result = await addLessonInCourse(courseId, formData)

        if (!result.success) {
            toast.error(result.error)
            console.error("Error in CREATE-LESSON: ", result.error);

            return;
        }

        toast.success("Aula criada com sucesso")
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
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Nova Aula</DialogTitle>
                            <DialogDescription>
                                Adicione uma nova aula ao curso. Preencha os campos abaixo.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
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

                            <div className="grid gap-2">
                                <Label>Materiais de Apoio</Label>

                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex items-center gap-2">
                                        <Input
                                            type="file"
                                            accept="application/pdf"
                                            multiple
                                            {...form.register("supporting_materials")}
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

                            <FormField
                                control={form.control}
                                name="order"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Ordem <span className="text-destructive">*</span>
                                        </FormLabel>
                                        <Input type="number" min={nextOrder ?? 1} {...field} />
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