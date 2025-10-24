import { Header } from "@/components/layout/header";
import { getSession } from "@/core/actions/auth/session/server";
import { redirect } from "next/navigation";

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
    const result = await getSession();

    if (!result.success) {
        redirect("/sign-in")
    }

    // Se o user não tiver role de admin e tentar acessar a rota dashboard, retorna um <notFound /> ou redireciona para o '/'

    return (
        <main>
            <Header data={result.data} />
            <main className="container mx-auto py-10 px-2 md:px-0 h-full">
                {children}
            </main>
        </main>
    )
}