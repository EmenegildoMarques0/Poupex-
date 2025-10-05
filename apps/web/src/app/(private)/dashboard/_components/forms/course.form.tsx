"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@workspace/ui/components/button";
import { DialogClose, DialogFooter } from "@workspace/ui/components/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { parseCookies } from "nookies";

const courseSchema = z.object({
    title: z.string().min(3, "O título é obrigatório"),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    is_public: z.enum(["public", "private"]),
    description: z.string().max(255, "Máx. 255 caracteres").optional(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

export function CourseForm() {
    const [file, setFile] = useState<File | null>(null);

    const form = useForm<CourseFormValues>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: "",
            level: undefined,
            is_public: "public",
            description: "",
        },
    });

    const onSubmit = async (data: CourseFormValues) => {
        try {
            if (!file) {
                alert("Selecione uma imagem para o curso.");
                return;
            }

            const thumbnail = file;
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("description", data.description || "");
            formData.append("level", data.level);
            formData.append("is_public", String(data.is_public)); // ✅ "true" ou "false"
            formData.append("thumbnail", thumbnail);

            const { "ppx-auth.session-token": token } = parseCookies();

            if (!token) {
                console.error("Não autenticado");
                return {
                    success: false,
                    error: "Não autenticado"
                };
            }

            const response = await fetch("/api/courses", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Falha ao criar curso");
            }

            const result = await response.json();
            console.log("✅ Curso criado:", result);

            alert("Curso criado com sucesso!");
            form.reset();
            setFile(null);
        } catch (error) {
            console.error("❌ Erro ao criar curso:", error);
            alert("Erro ao criar o curso. Verifique os dados e tente novamente.");
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {/* Título */}
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

                {/* Nível */}
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

                {/* Visibilidade */}
                <FormField
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
                />

                {/* Thumbnail */}
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

                {/* Descrição */}
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

                {/* Footer */}
                <DialogFooter className="flex gap-2 justify-end">
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
