"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { RefreshCcw, Save } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderWidget } from "../loader-widget";
import { profileInfoSchema, ProfileInfoValues } from "@/core/schemas/profile";

interface ProfileInfoFormProps {
    defaultValues: ProfileInfoValues,
}

export function ProfileInfoForm({ defaultValues }: ProfileInfoFormProps) {
    const form = useForm<ProfileInfoValues>({
        mode: "all",
        criteriaMode: "all",
        resolver: zodResolver(profileInfoSchema),
        defaultValues: {
            ...defaultValues
        }
    })

    const nameWatch = form.watch("name");
    const isValid = nameWatch === defaultValues.name;

    const onSubmit = async (formData: any) => {
        console.log({ formData });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome completo</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Ex: João da Silva"
                                        autoComplete="name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
            
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="exemplo@dominio.com"
                                        autoComplete="email"
                                        disabled
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <p className="text-xs tracking-wide text-muted-foreground font-bold">Nota: Email não pode ser alterado</p>

                <Button type="submit" disabled={form.formState.isSubmitting || isValid}>
                    {form.formState.isSubmitting ? (
                        <LoaderWidget label="Salvando" />
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            Salvar Alterações
                        </>
                    )}
                </Button>
                <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    disabled={isValid}
                    title="Restaurar os dados padrão do usuário"
                    className="ml-2" 
                    onClick={() => {
                        form.setValue("name", defaultValues.name)
                    }}
                >
                    <RefreshCcw />
                </Button>
            </form>
        </Form>
    )
}