import { NavigationMenuLink } from "@/components/ui/navigation-menu";

interface HeaderNavLinkProps {
    href: string;
    label: string;
    active: boolean;
}

export function HeaderNavLink({ href, label, active }: HeaderNavLinkProps) {
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
