
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@workspace/ui/components/navigation-menu";
import { HeaderNavLink } from "./header-nav-link";
import { NAV_LINKS } from "./data";

export function HeaderNavigation() {
    return (
        <div className="flex items-center gap-6">
            <NavigationMenu className="h-full *:h-full max-md:hidden">
                <NavigationMenuList className="h-full gap-2">
                    {NAV_LINKS.map((link) => (
                        <NavigationMenuItem key={link.id} className="h-full">
                            <HeaderNavLink href={link.href} label={link.label} />
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}