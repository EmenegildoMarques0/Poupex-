import { Button } from "@workspace/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import Link from "next/link";
import React from "react";
import { AvatarUser } from "./avatar-user";
import { User2 } from "lucide-react";

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
        label: "Perfil",
        icon: User2,
        url: "/profile",
    }
]

export function AvatarProfileDropdown({ data: user, handleSignOut }: AvatarProfileDialogProps) {

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
                <DropdownMenuItem onClick={handleSignOut}>
                    Terminar Sessão
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}