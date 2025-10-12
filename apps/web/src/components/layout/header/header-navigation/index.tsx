"use client"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { HeaderNavLink } from "./header-navigation-link";
import { NAV_LINKS_CLIENT, NAV_LINKS_DASH } from "../data";
import { usePathname } from "next/navigation";

export function HeaderNavigation() {
    const pathname = usePathname();
    const NAV_LINKS = pathname.startsWith("/dashboard") ? NAV_LINKS_DASH : NAV_LINKS_CLIENT;
    return (
        <div className="flex items-center gap-6 px-4">
            <NavigationMenu className="h-full *:h-full max-md:hidden">
                <NavigationMenuList className="h-full gap-2">
                    {NAV_LINKS.map((link) => (
                        <NavigationMenuItem key={link.id} className="h-full">
                            <HeaderNavLink href={link.href} label={link.label} active={pathname === link.href} />
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}