"use client";

import { Button } from "@workspace/ui/components/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { type SignInSchemaValues, signInSchema } from "@/@types/auth/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const SignInForm = () => {
    const router = useRouter();
    const form = useForm<SignInSchemaValues>({
        mode: "all",
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (formData: SignInSchemaValues) => {
        const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/v1/login`;
        console.log("🔗 API_URL Final:", API_URL);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            // sempre tenta ler a resposta do backend
            const data = await response.json().catch(() => null);
            console.log("🔎 Resposta do backend:", data);

            if (!response.ok) {
                toast.error("Falha ao entrar", {
                    description: data?.message ?? "Credenciais inválidas",
                });
                return;
            }

            // ajusta conforme a estrutura real da API
            setCookie(null, "ppx-auth.session-token", data?.data?.token, {
                maxAge: 60 * 60 * 1, // 1h
                path: "/",
            });

            setCookie(null, "ppx-auth.refresh-token", data?.data?.refreshToken, {
                maxAge: 60 * 60 * 24 * 7, // 7d
                path: "/",
            });

            form.reset();
            toast.success("Login realizado com sucesso.");
            router.replace("/");
        } catch (error) {
            console.error("❌ Erro inesperado no login:", error);
            toast.error("Falha ao fazer login", {
                description: "Tente novamente em instantes",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="exemplo@email.com"
                                    autoComplete="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center justify-between">
                                <FormLabel>Senha</FormLabel>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
                                >
                                    Esqueceu a senha?
                                </Link>
                            </div>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Pelo menos 8 caracteres"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full"
                >
                    {form.formState.isSubmitting ? (
                        <div className="flex items-center">
                            <Loader2 className="mr-2 animate-spin" />
                            <span>Entrando...</span>
                        </div>
                    ) : (
                        "Entrar"
                    )}
                </Button>
            </form>
        </Form>
    );
};
