import { AvatarTrigger } from "@/components/avatar/avatar-trigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { HeaderTabs } from "./header-tabs";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
    return (
        <header className="px-4 lg:px-6 border-b bg-neutral-50 dark:bg-neutral-900">
            <div className="py-4 flex items-center justify-between">
                <h1 className="text-2xl font-extrabold">Poupex</h1>
                <div className="flex items-center gap-4">
                    <div className="relative mr-4">
                        <Search className="absolute size-5 text-neutral-500 ml-2.5 top-1/2 -translate-y-1/2" />
                        <Input type="search" placeholder="Pesquisar..." className="pl-10" />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button type="button">
                            <PlusCircle />
                            <span>Adicionar gasto</span>
                        </Button>
                        <Separator orientation="vertical" className="h-full min-h-6 bg-border" />
                        <ThemeToggle />
                        <AvatarTrigger />
                    </div>
                </div>
            </div>
            <HeaderTabs />
        </header>
    )
}