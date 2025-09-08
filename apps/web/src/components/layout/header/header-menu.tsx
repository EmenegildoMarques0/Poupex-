"use client"
import { Button } from "@workspace/ui/components/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@workspace/ui/components/navigation-menu"
import { Popover, PopoverTrigger, PopoverContent } from "@workspace/ui/components/popover"
import { NAV_LINKS } from "./data"
import { usePathname } from "next/navigation"

export function HeaderMenuHamburguer() {
    const pathname = usePathname();

    return (
        <div className="md:hidden flex items-center gap-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="group size-8" variant="ghost" size="icon">
                        <MenuXSVG />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-dvw mt-3 p-2 md:hidden rounded-[0px] rounded-b-lg z-40 border-none bg-neutral-50 dark:bg-neutral-900">
                    <NavigationMenu className="max-w-none *:w-full">
                        <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                            {NAV_LINKS.map((link, index) => (
                                <NavigationMenuItem key={index} className="w-full">
                                    <NavigationMenuLink href={link.href} active={link.href === pathname} 
                                        className="py-1.5 data-[active]:bg-primary! hover:bg-transparent ">
                                        {link.label}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </PopoverContent>
            </Popover>
        </div>
    )
}

function MenuXSVG() {
    return (
        <svg
            className="pointer-events-none"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 12L20 12"
                className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
            />
            <path
                d="M4 12H20"
                className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
            />
            <path
                d="M4 12H20"
                className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
            />
        </svg>
    )
}