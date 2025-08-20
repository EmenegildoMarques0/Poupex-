import { Header } from "./_components/header";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
            <Header />
			<main className="container mx-auto py-10">
                {children}
            </main>
		</div>
	);
}
