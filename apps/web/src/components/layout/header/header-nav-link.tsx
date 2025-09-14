"use client";
import { usePathname } from "next/navigation";
import { NavigationMenuLink } from "@workspace/ui/components/navigation-menu";

interface HeaderNavLinkProps { href: string; label: string }

export function HeaderNavLink({ href, label }: HeaderNavLinkProps) {
    const pathname = usePathname();
    const active = pathname === href;
    return (
        <NavigationMenuLink
            active={active}
            href={href}
            className="text-muted-foreground hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full flex justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!"
        >
            {label}
        </NavigationMenuLink>
    );
}
