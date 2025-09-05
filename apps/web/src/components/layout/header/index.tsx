"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";

import { CostsForm } from "../../forms/costs-form";
import { AvatarProfileDropdown } from "@/components/avatar/avatar-profile-dropdown";
import { HeaderNavigation } from "./header-navigation";
import { useSession } from "@/hooks/auth/get-session";
import { toast } from "sonner";
import { parseCookies } from "nookies";
import { createCostAction } from "@/actions/costs/create-costs";
import { useRouter } from "next/navigation";

export function Header() {
	const { data: sessionData, loading } = useSession();
	const router = useRouter()

	const handleSignOut = () => {
		router.replace("/sign-in");
	};

	const handleCreateCost = async (values: any) => {
		const { "ppx-auth.session-token": token } = parseCookies();
		if (!token) {
			toast.error("Não autenticado")
			return;
		}
		const res = await createCostAction(values, token);
		
		toast("Custo criado com sucesso",{
			description: JSON.stringify(res, null, 2)
		})
	};

  return (
    <header className="sticky top-0 left-0 z-30 px-4 lg:px-6 border-b bg-neutral-50 dark:bg-neutral-900">
      <div className="py-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Poupex</h1>
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button">
                <PlusCircle className="h-4 w-4" />
                <span>Adicionar gasto</span>
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastrar novo gasto</DialogTitle>
                <DialogDescription>
                  Preencha os campos abaixo para registrar um novo gasto no sistema.
                </DialogDescription>
              </DialogHeader>

              <CostsForm onSubmit={handleCreateCost} />
            </DialogContent>
          </Dialog>

          <Separator
            orientation="vertical"
            className="h-full min-h-6 bg-border"
          />

          <ThemeToggle />

          {!loading && sessionData ? (
            <AvatarProfileDropdown
              data={{
                name: "sessionData.name",
                email: "sessionData.email",
              }}
              handleSignOut={handleSignOut}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-neutral-400/40 animate-pulse" />
          )}
        </div>
      </div>
      <HeaderNavigation />
    </header>
  );
}
