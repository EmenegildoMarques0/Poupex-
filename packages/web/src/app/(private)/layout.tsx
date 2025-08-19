import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <ul className="flex items-center gap-4 mb-4">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/costs" className="hover:underline">Gastos</Link></li>
                <li><Link href="/statistic" className="hover:underline">Estatistica</Link></li>
            </ul>
            {children}
        </div>
    )
}