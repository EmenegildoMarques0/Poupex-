"use client"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@workspace/ui/components/navigation-menu";
import { usePathname } from "next/navigation";

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

export function HeaderNavigation() {
    const pathname = usePathname();
    return (
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
    )
}