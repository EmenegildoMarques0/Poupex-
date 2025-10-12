"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { type CreateCourseSchemaValues, createCourseSchema } from "@/core/schemas/course";
import { course } from "@/core/actions/course";

export function CourseForm() {
    const [file, setFile] = useState<File | null>(null);

    const form = useForm<CreateCourseSchemaValues>({
        resolver: zodResolver(createCourseSchema),
        defaultValues: {
            title: "",
            level: undefined,
            is_public: "public",
            description: "",
        },
    });

    const onSubmit = async (data: CreateCourseSchemaValues) => {
        if (!file) {
            toast.error("Selecione uma imagem para o curso.");
            return;
        }

        const result = await course.create({ file, ...data });
        if (!result.success) {
            toast.error(result.error);
            return;
        }

        toast.success(result.message);
    };


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Título</FormLabel>
                            <Input
                                type="text"
                                placeholder="Digite um título para o curso"
                                {...field}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nível</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um nível" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Nível</SelectLabel>
                                        <SelectItem value="beginner">Iniciante</SelectItem>
                                        <SelectItem value="intermediate">Intermediário</SelectItem>
                                        <SelectItem value="advanced">Avançado</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* <FormField
                    control={form.control}
                    name="is_public"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Visibilidade</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o estado" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Status</SelectLabel>
                                        <SelectItem value="public">Público</SelectItem>
                                        <SelectItem value="private">Privado</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                <FormItem className="md:col-span-2">
                    <FormLabel>Thumbnail</FormLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    {file && (
                        <p className="text-xs text-neutral-500 mt-1 truncate">{file.name}</p>
                    )}
                </FormItem>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <div className="flex items-center justify-between">
                                <FormLabel>Descrição</FormLabel>
                                <span className="text-xs text-muted-foreground">
                                    {field.value?.length || 0} / 255
                                </span>
                            </div>
                            <Textarea
                                placeholder="Escreva uma pequena descrição do seu curso"
                                className="min-h-20 placeholder:text-sm resize-none"
                                maxLength={255}
                                {...field}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter className="col-span-2 flex gap-2 justify-end">
                    <DialogClose asChild>
                        <Button variant="destructive">Fechar</Button>
                    </DialogClose>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Adicionando..." : "Adicionar"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}