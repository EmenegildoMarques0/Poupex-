"use client"
import { Button } from "@workspace/ui/components/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@workspace/ui/components/navigation-menu"
import { Popover, PopoverTrigger, PopoverContent } from "@workspace/ui/components/popover"
import { NAV_LINKS_MOBLE } from "./data"
import { usePathname } from "next/navigation"
import { AvatarUser } from "@/components/avatar/avatar-user"
import { useSession } from "@/hooks/auth/session/client"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Separator } from "@workspace/ui/components/separator"
import { LogOut } from "lucide-react"

export function HeaderMobileMenu() {
    const pathname = usePathname();
    const { data: session, loading, signOut } = useSession();

    return (
        <div className="md:hidden sm:mx-auto flex items-center gap-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="group size-8" variant="ghost" size="icon">
                        <MenuXSVG />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-dvw mt-3 p-2 md:hidden rounded-[0px] rounded-b-lg z-40 border-none bg-neutral-50 dark:bg-neutral-900">
                    <div className="pb-2 flex gap-3 items-center">
                        {loading || !session ? (
                            <>
                                <Skeleton className="h-10 w-10 rounded-full border-2 border-neutral-200 dark:border-neutral-700" />
                                <div className="flex-1 space-y-1.5">
                                    <Skeleton className="block h-3 max-w-11/12 sm:max-w-1/2 rounded-full transition-all duration-200" />
                                    <Skeleton className="block h-2 max-w-3/4 sm:max-w-1/3 rounded-full transition-all duration-200" />
                                </div>
                                <Skeleton className="h-8 w-8 rounded-md" />
                            </>
                        ) : (
                            <>
                                <AvatarUser name={session.name} />
                                <div>
                                    <span className="block text-sm">{session.name}</span>
                                    <span className="block text-xs text-neutral-500">{session.email}</span>
                                </div>
                                <Button type="button" size="icon" variant="outline" onClick={signOut}>
                                    <LogOut />
                                </Button>
                            </>
                        )}
                    </div>
                    <Separator orientation="horizontal" className="w-full min-w-6 bg-border mb-4" />
                    <NavigationMenu className="max-w-none *:w-full">
                        <NavigationMenuList className="flex-col items-start gap-1.5 md:gap-2">
                            {NAV_LINKS_MOBLE.map((link, index) => (
                                <NavigationMenuItem key={index} className="w-full">
                                    <NavigationMenuLink href={link.href} active={link.href === pathname} 
                                        className="py-1.5 data-[active]:bg-primary!  ">
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