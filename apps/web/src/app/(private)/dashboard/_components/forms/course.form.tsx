"use client"
import { Button } from "@workspace/ui/components/button";
import { DialogClose, DialogFooter } from "@workspace/ui/components/dialog";
import { useForm } from "react-hook-form";
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
import UploadFile from "../upload-file";

export function CourseForm() {
    const form = useForm()

    const onSubmit = (formData: any) => {
        console.log({ formData });

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2 col-span-1">
                            <FormLabel>Título</FormLabel>
                            <Input
                                type="text"
                                placeholder="Digite um titulo para o curso"
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
                        <FormItem className="md:col-span-1 col-span-2">
                            <FormLabel>Nível</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione um nível" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Nível</SelectLabel>
                                        <SelectItem value="beginner">Iniciante</SelectItem>
                                        <SelectItem value="intermediante">Intermediário</SelectItem>
                                        <SelectItem value="advanced">Avançado</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="is_public"
                    render={({ field }) => (
                        <FormItem className="md:col-span-1 col-span-2">
                            <FormLabel>Nível</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione um estado" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Status</SelectLabel>
                                        <SelectItem value="true">Público</SelectItem>
                                        <SelectItem value="false">Privado</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem className="md:col-span-1 col-span-2">
                            <FormLabel>Thumbnail</FormLabel>
                            <Input
                                type="file"
                                {...field}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* <UploadFile /> */}

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <div className="flex items-center justify-between">
                                <FormLabel>Descrição</FormLabel>
                                <span className="text-xs text-neutral-500">
                                    {field.value?.length || 0} de 255 caracteres
                                </span>
                            </div>
                            <Textarea
                                placeholder="Escreva uma pequena descrição do seu curso"
                                className="p-4 min-h-20 placeholder:text-sm"
                                maxLength={255}
                                {...field}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive">Fechar</Button>
                    </DialogClose>
                    <Button type="submit">Adicionar</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}