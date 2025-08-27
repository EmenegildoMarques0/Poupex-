import { SignInForm } from "@/components/forms/sign-in-form";

export default function SignInPage() {
    return (
        <main className="h-screen flex flex-col gap-6 md:flex-row-reverse">
            <div className="flex-1 flex md:items-center justify-center px-4">
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-8 text-center">
                            Poupex
                        </h1>
                        <h2 className="text-2xl font-bold mb-2">
                            Bem-vindo de volta 👋
                        </h2>
                        <p className="text-neutral-500 mb-2">
                            Faça login para começar a gerenciar seus projetos.
                        </p>
                    </div>
                    <SignInForm />
                </div>
            </div>
        </main>
    );
}