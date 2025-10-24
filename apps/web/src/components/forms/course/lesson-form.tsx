"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { course } from "@/core/actions/course";
import { createLessonSchema, type CreateLessonSchemaValues } from "@/core/schemas/course/lesson.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface LessonFormProps {
    courseId: number
    nextOrder: number
}

export function LessonForm({ courseId, nextOrder }: LessonFormProps) {
    const [open, setOpen] = useState(false);
    const form = useForm<CreateLessonSchemaValues>({
        mode: "all",
        criteriaMode: "firstError",
        resolver: zodResolver(createLessonSchema),
        defaultValues: {
            title: "",
            link: "",
            description: "",
            order: String(nextOrder)
        }
    });

    const onSubmit = async (data: CreateLessonSchemaValues) => {
        const result = await course.lesson.create({
            title: data.title,
            description: data.description,
            link: data.link,
            order: data.order,
            courseId: String(courseId),
        });

        if (!result.success) {
            toast.error(result.error);
            return;
        }

        form.reset();
        setOpen(false);
        toast.success(result.message);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 text-white">
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