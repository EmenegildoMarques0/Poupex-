import { RegisterUserForm } from "@/components/forms/auth/register-user-form";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <main className="h-screen flex flex-col gap-6 md:flex-row-reverse">
            <div className="flex-1 flex items-center justify-center px-6">
                <div className="flex flex-col gap-6 max-w-md w-full">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold mb-4 text-primary">Poupex</h1>
                        <h2 className="text-2xl font-semibold mb-2">
                            Crie sua conta 🚀
                        </h2>
                        <p className="text-neutral-500">
                            Registre-se para começar a gerenciar seus projetos.
                        </p>
                    </div>

                    <RegisterUserForm />

                    <p className="text-sm text-neutral-500 text-center">
                        Já tem uma conta?{" "}
                        <Link href="/sign-in" className="text-primary font-medium hover:underline">
                            Entrar
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}