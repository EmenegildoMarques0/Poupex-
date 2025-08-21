import { Header } from "@/components/layout/header";

export default function PrivateLayout({ children }: { children: React.ReactNode}) {
    return (
        <div>
            <Header />
            <main className="container mx-auto py-10">
                {children}
            </main>
        </div>
    )
}