"use client"

import { memo, useCallback } from "react"
import Link from "next/link"
import { LogOut, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface NavItem {
    label: string
    href: string
}

interface MobileMenuProps {
    items: NavItem[]
    pathname: string
    onClose: () => void
}

export const HeaderMobileMenu = memo(function MobileMenu({ items, pathname, onClose }: MobileMenuProps) {
    const handleLinkClick = useCallback(() => {
        onClose()
    }, [onClose])

    return (
        <div className="border-t border-border md:hidden">
            <nav className="px-4 py-3 space-y-1.5">
                {items.map((item) => {
                    const isActive = pathname === item.href || (item.href === "/courses" && pathname.startsWith("/courses"))

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleLinkClick}
                            className={cn(
                                "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                                isActive ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                            )}
                        >
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="border-t border-border px-4 py-3 space-y-2">
                {pathname.includes("/courses") && (
                    <div className="relative">
                        <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2" />
                        <Input type="text" className="pl-10" placeholder="Buscar..." />
                    </div>
                )}

                <Button variant="secondary" className="w-full">
                    <LogOut />
                    <span>Terminar Sessão</span>
                </Button>
            </div>
        </div>
    )
})
