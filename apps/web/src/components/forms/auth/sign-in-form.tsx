"use client"
import { LoaderWidget } from "@/components/loader-widget";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signInSchema, SignInSchemaValues } from "@/core/schemas/auth/sign-in.schema";
import { auth } from "@/core/actions/auth";

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
        const result = await auth.signIn({
            email: formData.email,
            password: formData.password
        });

        if (!result.success) {
            toast.error(result.error);
            return;
        }

        form.reset();
        toast.success(result.message);
        router.replace("/");
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
                                    href="/forgot"
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
                        <LoaderWidget label="Entrando" />
                    ) : (
                        "Entrar"
                    )}
                </Button>
            </form>
        </Form>
    );
};
