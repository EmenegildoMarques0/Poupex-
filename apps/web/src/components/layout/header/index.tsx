"use client";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { NAV_LINKS_CLIENT_MOBLE, NAV_LINKS_DASH_MOBLE } from "./data";
import { HeaderAddCost } from "./header-add-cost";
import { HeaderCourseSelector } from "./header-course-selector";
import { HeaderLogo } from "./header-logo";
import { HeaderMobileMenu } from "./header-mobile-menu";
import { SearchCorseInput } from "./header-mobile-menu/search-corse-input";
import { HeaderNavigation } from "./header-navigation";
import { HeaderUserMenu } from "./header-user-menu";
import { User } from "@/core/schemas/user";

export function Header({ data: session }: { data: User }) {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const currentCourseId = useMemo(() => {
		const courseIdMatch = pathname.match(/\/courses\/(\d+)/);
		return courseIdMatch ? courseIdMatch[1] : null;
	}, [pathname]);

	const toggleMobileMenu = useCallback(() => {
		setMobileMenuOpen((prev) => !prev);
	}, []);

	const closeMobileMenu = useCallback(() => {
		setMobileMenuOpen(false);
	}, []);

	const NAV_ITEMS = pathname.startsWith("/dashboard")
		? NAV_LINKS_DASH_MOBLE
		: NAV_LINKS_CLIENT_MOBLE;

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background">
			<div className="flex h-16 items-center justify-between px-4 md:px-6">
				<div className="flex items-center gap-3 md:gap-6">
					<Button
						variant="ghost"
						size="icon"
						className="group md:hidden "
						onClick={toggleMobileMenu}
					>
						{mobileMenuOpen ? <X /> : <Menu />}
					</Button>

					<HeaderLogo />

					<HeaderCourseSelector currentCourseId={currentCourseId} />
				</div>

				<div className="flex items-center gap-2 md:gap-4">
					{pathname.includes("course") && (
						<div className="relative hidden md:block">
							<SearchCorseInput />
						</div>
					)}
					<HeaderAddCost />

					{session ? (
						<HeaderUserMenu user={session} />
					) : (
						<Skeleton className="w-10 h-10 rounded-full border" />
					)}
				</div>
			</div>

			<HeaderNavigation />

			{mobileMenuOpen && (
				<>
					<HeaderMobileMenu
						items={NAV_ITEMS}
						pathname={pathname}
						onClose={closeMobileMenu}
					/>
					<HeaderCourseSelector
						currentCourseId={currentCourseId}
						isMobile
						onCourseChange={closeMobileMenu}
					/>
				</>
			)}
		</header>
	);
}
