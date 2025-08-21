"use client"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import { AvatarUser } from "@/components/avatar-user";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Search } from "lucide-react";

const NAV_LINKS = [
    {
        id: "1",
        href: "/",
        label: "Overview"
    },
    {
        id: "2",
        href: "/costs",
        label: "Gastos",
    },
    {
        id: "3",
        href: "/statistic",
        label: "Estatísticas",
    },
]

export function Header() {
    const pathname = usePathname();
    return (
        <header className="px-4 lg:px-6 border-b bg-neutral-50 dark:bg-neutral-900">
            <div className="py-4 flex items-center justify-between">
                <h1 className="text-2xl font-extrabold">Poupex</h1>
                <div className="flex items-center gap-4">
                    <div className="relative mr-4">
                        <Search className="absolute size-5 text-neutral-500 ml-2.5 top-1/2 -translate-y-1/2" />
                        <Input type="search" placeholder="Pesquisar..." className="pl-10" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button type="button">
                            <PlusCircle />
                            <span>Adicionar gasto</span>
                        </Button>
                        <Separator orientation="vertical" className="h-full min-h-6 bg-border" />
                        <ThemeToggle />
                        <AvatarUser />
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-6">            
                <NavigationMenu className="h-full *:h-full max-md:hidden">
                <NavigationMenuList className="h-full gap-2">
                    {NAV_LINKS.map((link) => (
                    <NavigationMenuItem key={link.id} className="h-full">
                        <NavigationMenuLink
                        active={pathname === link.href}
                        href={link.href}
                        className="text-muted-foreground hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full flex justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!"
                        >
                        {link.label}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
                </NavigationMenu>
          </div>
        </header>
    )
}