import { useCallback } from "react";
import { parseCookies } from "nookies";
import { toast } from "sonner";
import { PlusCircle, Menu } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { HeaderNavigation } from "./header-navigation";
import { CostsForm } from "../../forms/costs-form";

import { createCostAction } from "@/actions/costs/create-costs";

import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog";
import { RegisterCostFormValues } from "@/@types/validations/register-cost.schema";
import { HeaderUserAvatar } from "./header-user-avatar";
import { HeaderMenuHamburguer } from "./header-menu";


export function Header() {
	const handleCreateCost = useCallback(async (values: RegisterCostFormValues) => {
		const { "ppx-auth.session-token": token } = parseCookies();
		if (!token) {
			toast.error("Não autenticado");
			return;
		}

		try {
			const res = await createCostAction(values, token);
			toast.success("Custo criado com sucesso", {
				description: JSON.stringify(res, null, 2),
			});
		} catch (err) {
			toast.error("Erro ao criar custo");
		}
	}, []);

	return (
		<header className="sticky min-h-16 top-0 left-0 z-40 border-b bg-neutral-50 px-4 dark:bg-neutral-900 lg:px-6">
			<div className="flex items-center justify-between py-4">
				<h1 className="text-2xl font-extrabold">Poupex</h1>

				<div className="flex items-center gap-4">
					<Dialog>
						<DialogTrigger asChild className="max-md:hidden">
							<Button type="button">
								<PlusCircle className="h-4 w-4" />
								<span>Adicionar gasto</span>
							</Button>
						</DialogTrigger>

						<DialogContent>
							<DialogHeader>
								<DialogTitle>Cadastrar novo gasto</DialogTitle>
								<DialogDescription>
								Preencha os campos abaixo para registrar um novo gasto no
								sistema.
								</DialogDescription>
							</DialogHeader>

							<CostsForm onSubmit={handleCreateCost} />
						</DialogContent>
					</Dialog>

					<Separator orientation="vertical" className="h-full min-h-6 bg-border max-md:hidden " />

					<ThemeToggle className="max-md:hidden" />
					<HeaderUserAvatar />
					<Separator orientation="vertical" className="h-full min-h-6 bg-border md:hidden " />
					<HeaderMenuHamburguer />
				</div>
				
			</div>
			<HeaderNavigation />
		</header>
	);
}
