import { Header } from "@/components/layout/header";

export default function PrivateLayout({ children }: { children: React.ReactNode}) {
    return (
        <div>
            <Header />
            <main className="container mx-auto py-10 px-2 md:px-0">
                {children}
            </main>
        </div>
    )
}