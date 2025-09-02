import { SignInForm } from "@/components/forms/sign-in-form";
import Link from "next/link";

export default function SignInPage() {
    return (
        <main className="h-screen flex flex-col gap-6 md:flex-row-reverse">
            <div className="flex-1 flex md:items-center justify-center px-4">
                <div className="flex flex-col gap-6 max-w-md w-full">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold mb-4 text-primary">Poupex</h1>
                        <h2 className="text-2xl font-semibold mb-2">
                            Bem-vindo de volta 👋
                        </h2>
                        <p className="text-neutral-500 mb-2">
                            Faça login para começar a gerenciar seus projetos.
                        </p>
                    </div>
                    <SignInForm />
                    <p className="text-sm text-neutral-500 text-center">
                        Ainda não tem uma conta?{" "}
                        <Link href="/register" className="text-primary font-medium hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}