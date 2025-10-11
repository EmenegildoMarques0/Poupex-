import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/core/providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Poupex - Controle de Gastos Pessoais",
	description:
		"Gerencie suas finanças com o Poupex. Registre despesas diárias, visualize estatísticas e tenha controle total do seu dinheiro de forma simples e rápida.",
	keywords: [
		"controle financeiro",
		"gastos pessoais",
		"finanças pessoais",
		"organização financeira",
		"app de despesas",
	],
	openGraph: {
		title: "Poupex - Controle de Gastos Pessoais",
		description:
			"Aplicativo web para controle de gastos pessoais. Registre despesas, acompanhe estatísticas e melhore sua gestão financeira.",
		url: "https://poupex-six.vercel.app",
		siteName: "Poupex",
		locale: "pt_AO",
		type: "website",
	},
};


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased tracking-wide`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
