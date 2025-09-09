"use client"
import { Button } from "@workspace/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import Link from "next/link";
import React from "react";
import { AvatarUser } from "./avatar-user";
import { LogOut, Settings } from "lucide-react";
import { logoutAction } from "@/actions/auth/logout.action";

interface AvatarProfileDialogProps {
    data: {
        name: string;
        image?: string;
        email: string;
    }
    handleSignOut?: () => void;
}

const Itens = [
    {
        id: "10/12/2032",
        label: "Definições de conta",
        icon: Settings,
        url: "/profile",
    }
]

export function AvatarProfileDropdown({ data: user }: AvatarProfileDialogProps) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-fit h-fit p-0 font-normal rounded-full bg-transparent"
                    aria-label="User menu"
                >
                    <AvatarUser name={user.name} image={user.image} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal mb-2">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                {Itens && <DropdownMenuSeparator />}
                <DropdownMenuGroup>
                    {Itens.map((item) => (
                        <DropdownMenuItem key={item.id} className="p-0">
                            <Link
                                href={item.url}
                                className="w-full py-2 px-2.5 flex items-center gap-2"
                            >
                                {item.icon && <item.icon className="w-5 h-5" />}
                                {item.label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <form action={logoutAction} className="w-full">
                        <button
                            type="submit"
                            className="w-full text-left  px-1 flex items-center gap-2"
                        >
                            <LogOut />
                            <span>Terminar Sessão</span>
                        </button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}