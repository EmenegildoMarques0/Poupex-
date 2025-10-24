"use client";
import Link from "next/link";
import { memo } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/core/actions/auth";
import type { User } from "@/core/schemas/user";

interface UserMenuProps {
	user?: User;
}

export const HeaderUserMenu = memo(function UserMenu({ user }: UserMenuProps) {
	const initials =
		user?.name
			?.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase() || "U";

	const handleSignOut = async () => {
		const result = await auth.signOut();
		if (!result.success) {
			toast.error(result.error);
			return;
		}

		toast.success(result.message);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="rounded-full">
					<Avatar className="h-10 w-10">
						<AvatarImage alt={user?.name} />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<div className="px-2 py-1.5">
					<p className="text-sm font-medium">
						{user?.name || "Usuário"}
					</p>
					<p className="text-xs text-muted-foreground">
						{user?.email || "user@example.com"}
					</p>
				</div>
				<DropdownMenuItem asChild>
					<Link href="/profile">Perfil</Link>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleSignOut}>
					Terminar Sessão
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
});
