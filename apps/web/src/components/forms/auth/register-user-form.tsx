"use client"

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
import { useForm } from "react-hook-form";
import { LoaderWidget } from "@/components/loader-widget";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerUserSchema, RegisterUserSchemaValues } from "@/core/schemas/auth/register-user.schema";
import { auth } from "@/core/actions/auth";

export function RegisterUserForm() {
	const router = useRouter();
	const form = useForm<RegisterUserSchemaValues>({
		mode: "all",
		criteriaMode: "firstError",
		resolver: zodResolver(registerUserSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirmation: "",
		},
	});

	const onSubmit = async (formData: RegisterUserSchemaValues) => {
		const result = await auth.register({
			name: formData.name,
			email: formData.email,
			password: formData.password,
			passwordConfirmation: formData.passwordConfirmation,
		});

		if (!result.success) {
			toast.error(result.error);
			return;
		}

		toast.success(result.message);
		router.replace("/sign-in");
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Mínimo de 8 caracteres"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="passwordConfirmation"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirmar senha</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Repita sua senha"
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
						<LoaderWidget label="Cadastrando usuário" />
					) : (
						"Criar conta"
					)}
				</Button>
			</form>
		</Form>
	);
}
