
import { ThemeToggle } from "@/components/theme-toggle";
import { HeaderNavigation } from "./header-navigation";


import { Separator } from "@workspace/ui/components/separator";

import { HeaderUserAvatar } from "./header-user-avatar";
import { HeaderMobileMenu } from "./header-mobile-menu";
import { RegisterCostDialog } from "./register-cost-dialog";


export function Header() {
	

	return (
		<header className="sticky min-h-16 top-0 left-0 z-40 border-b bg-neutral-50 px-4 dark:bg-neutral-900 lg:px-6">
			<div className="flex items-center justify-between py-4">
				<h1 className="text-2xl font-extrabold">Poupex</h1>

				<div className="flex items-center gap-4">
					<RegisterCostDialog />

					<Separator orientation="vertical" className="h-full min-h-6 bg-border max-md:hidden " />
					<ThemeToggle className="max-md:hidden" />
					<HeaderUserAvatar />
					<HeaderMobileMenu />
				</div>
				
			</div>
			<HeaderNavigation />
		</header>
	);
}
