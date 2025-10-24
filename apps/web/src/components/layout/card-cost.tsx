"use client";

import { Edit, Info, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cost as costsAction } from "@/core/actions/cost";
import type { Costs } from "@/core/schemas/costs";
import { DeleteDialog } from "../tables/costs/more-dialogs/delete-dialog";
import { InfoDialog } from "../tables/costs/more-dialogs/info-dialog";
import { UpdateDialog } from "../tables/costs/more-dialogs/update-dialog";

type Props = {
	cost: Costs;
	currency?: string;
	locale?: string;
};

export function CostCard({ cost, currency = "AOA", locale = "pt-PT" }: Props) {
	const formatDate = (d: string) => {
		if (!d) return "—";
		const date = new Date(d);
		return date.getTime()
			? d
			: new Intl.DateTimeFormat(locale, {
					day: "2-digit",
					month: "short",
					year: "numeric",
				}).format(date);
	};

	const formatCurrency = (v: number) =>
		new Intl.NumberFormat(locale, { style: "currency", currency }).format(
			v,
		);

	const handleDelete = async (id: number | string) => {
		try {
			const res = await costsAction.delete(id);
			if (!res?.success) {
				toast.error("Falha ao deletar gasto.", {
					description: "Tente novamente mais tarde",
				});
				throw new Error(res?.error);
			}
			toast.success("Gasto apagado com sucesso.");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Card className="w-full rounded-2xl border shadow-lg bg-background md:hidden p-4 transition-transform active:scale-[0.98]">
			<CardHeader className="p-0 mb-4">
				<div className="flex flex-col gap-1">
					<div className="flex items-center justify-between gap-4">
						<Badge className="self-start text-[11px] uppercase tracking-wide px-2 py-0.5 bg-primary/10 text-primary">
							{cost.category}
						</Badge>
						<InfoDialog data={cost}>
							<Button variant="ghost" size="icon">
								<Info className="h-4 w-4" />
								<span className="sr-only">Detalhes</span>
							</Button>
						</InfoDialog>
					</div>
					<CardTitle
						title={cost.description}
						className="text-xl font-semibold leading-tight break-words line-clamp-2"
					>
						{cost.description || "Sem descrição"}
					</CardTitle>
					<p className="text-xs text-muted-foreground">
						{formatDate(cost.data)}
					</p>
				</div>
			</CardHeader>

			<CardContent className="p-0 flex-1 flex items-end">
				<div className="flex flex-col gap-3">
					<div>
						<span className="block text-xs text-muted-foreground">
							Valor
						</span>
						<span className="text-2xl font-bold text-primary truncate max-w-20">
							{formatCurrency(cost.value)}
						</span>
					</div>
				</div>
			</CardContent>

			<CardFooter className="mt-4 p-0 grid grid-cols-2 gap-3">
				<UpdateDialog
					data={cost}
					onUpdate={async (values) => {
						if (!values.id)
							throw new Error(
								"Todos os campos devem ser preenchidos.",
							);
						const res = await costsAction.update(values.id, values);

						if (!res?.success) {
							toast.error("Falha ao actualizar gasto.", {
								description: "Tente novamente mais tarde",
							});
							throw new Error(res?.error);
						}

						toast.success("Gasto actualizado com sucesso.");
					}}
				>
					<Button variant="secondary" size="lg" className="w-full">
						<Edit className="h-4 w-4" />
						Editar
					</Button>
				</UpdateDialog>

				<DeleteDialog
					data={cost}
					onConfirm={() => handleDelete(cost.id)}
				>
					<Button variant="outline" size="lg" className="w-full">
						<Trash2 className="h-4 w-4" />
						Excluir
					</Button>
				</DeleteDialog>
			</CardFooter>
		</Card>
	);
}
