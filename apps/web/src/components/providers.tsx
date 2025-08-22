"use client"
import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({ children }: { children: React.ReactNode}) {
	return (
		<NextThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			enableColorScheme
		>
			<NuqsAdapter>
				{children}
			</NuqsAdapter>
			<Toaster />
		</NextThemeProvider>
	)
}