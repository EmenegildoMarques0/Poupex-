"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { HeaderLogo } from "./header-logo";
import { HeaderNavigation } from "./header-navigation";
import { HeaderUserMenu } from "./header-user-menu";
import { useSession } from "@/core/actions/auth/session/client";
import { HeaderMobileMenu } from "./header-mobile-menu";
import { NAV_LINKS_CLIENT_MOBLE, NAV_LINKS_DASH_MOBLE } from "./data";
import { Menu, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HeaderCourseSelector } from "./header-course-selector";

export function Header() {
    const session = useSession();

    if (session.error) {
        notFound()
    }

    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const currentCourseId = useMemo(() => {
        const courseIdMatch = pathname.match(/\/courses\/(\d+)/)
        return courseIdMatch ? courseIdMatch[1] : null
    }, [pathname])

    const toggleMobileMenu = useCallback(() => {
        setMobileMenuOpen((prev) => !prev)
    }, [])

    const closeMobileMenu = useCallback(() => {
        setMobileMenuOpen(false)
    }, [])

    const NAV_ITEMS = pathname.startsWith("/dashboard") ? NAV_LINKS_DASH_MOBLE : NAV_LINKS_CLIENT_MOBLE;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
            <div className="flex h-14 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-3 md:gap-6">
                    <Button variant="ghost" size="icon" className="group md:hidden " onClick={toggleMobileMenu} >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </Button>

                    <HeaderLogo />

                    {/* <CourseSelector courses={COURSES} currentCourseId={currentCourseId} /> */}
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <div className="relative hidden md:block">
                        <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2" />
                        <Input type="text" className="pl-10" placeholder="Buscar..." />
                    </div>

                    <Link href="/feedback" className="hidden text-sm text-muted-foreground hover:text-foreground lg:block">
                        Feedback
                    </Link>

                    {session.user && <HeaderUserMenu user={session.user} />}
                </div>
            </div>

            <HeaderNavigation />

            {mobileMenuOpen && (
                <>
                    <HeaderMobileMenu items={NAV_ITEMS} pathname={pathname} onClose={closeMobileMenu} />
                    <HeaderCourseSelector
                        currentCourseId={currentCourseId}
                        isMobile
                        onCourseChange={closeMobileMenu}
                    />
                </>
            )}
        </header>
    )
}