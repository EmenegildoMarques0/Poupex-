"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function NotAuthenticatedSection() {
    const router = useRouter();

    return (
        <section className="flex min-h-[calc(100dvh-200px)] items-center justify-center">
            <div className="max-w-md mx-auto p-8 text-center">
                <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    Acesso Restrito
                </h1>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                    Você precisa estar autenticado para ver esta página.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                    <Button
                        variant="default"
                        onClick={() => router.push("/sign-in")}
                    >
                        Entrar
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.push("/")}
                    >
                        Voltar ao início
                    </Button>
                </div>
            </div>
        </section>
    );
}
