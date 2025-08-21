"use client"
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode}) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemeProvider>
  )
}