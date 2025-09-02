"use client"

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
import { useForm } from "react-hook-form";
import { LoaderWidget } from "../loader-widget";
import {
  registerUserSchema,
  RegisterUserValues,
} from "@/@types/validations/register-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function RegisterUserForm() {
  const router = useRouter();
  const form = useForm<RegisterUserValues>({
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

  const onSubmit = async (formData: RegisterUserValues) => {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/v1/register`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.passwordConfirmation,
        }),
      });

      const data = await response.json().catch(() => null);
      console.log("🔎 Resposta do backend:", data);

      if (!response.ok) {
        toast.error("Erro ao cadastrar usuário", {
          description: data?.message ?? "Verifique os dados e tente novamente.",
        });
        return;
      }

      form.reset();
      toast.success("Cadastro realizado com sucesso!", {
        description: "Agora você já pode acessar sua conta.",
      });
      router.replace("/sign-in");
    } catch (error) {
      console.error("❌ Erro inesperado no cadastro:", error);
      toast.error("Erro de conexão", {
        description: "Não foi possível concluir o cadastro. Tente novamente.",
      });
    }
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
            <LoaderWidget label="Cadastrando usuário..." />
          ) : (
            "Criar conta"
          )}
        </Button>
      </form>
    </Form>
  );
}
