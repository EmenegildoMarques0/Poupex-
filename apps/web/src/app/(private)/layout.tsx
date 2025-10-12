import { Header } from "@/components/layout/header";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Header />
            <main className="container mx-auto py-10 px-2 md:px-0 h-full">
                {children}
            </main>
        </main>
    )
}