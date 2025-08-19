"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const signInSchema = z.object({
	email: z.email({ message: "Informe um email válido" }),
	password: z.string().min(8, { message: "Deve ter no minimo 8 caractes" }),
});

export type SignInSchemaValues = z.infer<typeof signInSchema>;

export const SignInForm = () => {
	const router = useRouter();
	const form = useForm<SignInSchemaValues>({
		mode: "all",
		resolver: zodResolver(signInSchema),
		criteriaMode: "firstError",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (formData: SignInSchemaValues) => {
		const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/login`;
		try {
			const response = await fetch(API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
			});

			if (!response.ok) {
				toast.error("Credenciais inválidas");
				return;
			}

			// bs-auth.session-token
			const data = await response.json();
			setCookie(null, "bs-auth.session-token", data.data.token, {
				maxAge: 60 * 60 * 1,
				path: "/",
			});
			setCookie(null, "bs-auth.refresh-token", data.data.refreshToken, {
				maxAge: 60 * 60 * 24 * 7,
				path: "/",
			});
			form.reset();
			toast.success("Login realizado com sucesso.");
			router.replace("/");
		} catch (error) {
			toast.error("Falha ao fazer login", {
				description: "Agurarde um pouco e tente novamente mais tarde",
			});
			console.log("Falha ao fazer login", error);
			throw new Error("Falha ao fazer login");
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
									aria-autocomplete="list"
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
									as="/forgor-password"
								>
									Esqueceu a senha?
								</Link>
							</div>
							<FormControl>
								<Input
									type="password"
									placeholder="Pelo menos 8 caractes"
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
					className="w-full bg-blue-600 hover:bg-blue-700"
				>
					{form.formState.isSubmitting ? (
						<div className="flex items-center">
							<Loader2 className="mr-2 animate-spin inline-block" />
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
