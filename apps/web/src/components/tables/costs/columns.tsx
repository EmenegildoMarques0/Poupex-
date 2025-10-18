"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { CopyCheck, Edit, Info, MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cost as costAction } from "@/core/actions/cost";
import type { Costs } from "@/core/schemas/costs";
import { copyToClipboard } from "@/lib/formats/copy-to-clipboard";
import { formatCurrency } from "@/lib/formats/format-currency";
import { formatDate, formatDateFull } from "@/lib/formats/format-date";
import { DeleteDialog } from "./more-dialogs/delete-dialog";
import { InfoDialog } from "./more-dialogs/info-dialog";
import { UpdateDialog } from "./more-dialogs/update-dialog";

export const columns: ColumnDef<Costs>[] = [
	{
		accessorKey: "id",
		header: () => <div className="text-center">Índice</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.original.id}</div>;
		},
	},
	{
		accessorKey: "category",
		header: "Categoria",
		cell: ({ row }) => {
			const field = row.getValue("category") as string;
			return <div>{field}</div>;
		},
	},
	{
		accessorKey: "description",
		header: "Descrição",
		cell: ({ row }) => {
			return (
				<div className="truncate max-w-[200px]">
					{row.original.description}
				</div>
			);
		},
	},
	{
		accessorKey: "data",
		header: "Data",
		cell: ({ row }) => formatDateFull(row.original.data),
	},
	{
		accessorKey: "value",
		header: "Valor (Kz)",
		cell: ({ row }) => formatCurrency(row.original.value),
	},
	/* {
		accessorKey: "process",
		header: ({ column }) => {
			return (
				<div className="text-center">
					<Button
						variant="ghost"
						className="hover:bg-transparent dark:hover:bg-transparent px-0 -mx-2 cursor-pointer"
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === "asc")
						}
					>
						Número de processo
						<ArrowSwapVertical />
					</Button>
				</div>
			);
		},
		cell: ({ row }) => (
			<div className="text-center">{row.getValue("process")}</div>
		),
	}, */
	{
		accessorKey: "criado a",
		header: "Criado a",
		cell: ({ row }) => (
			<div className="lowercase dark:text-neutral-500 text-xs first-letter:uppercase">
				{formatDate(row.original.created_at)}
			</div>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const cost = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreVertical className="rotate-90" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Acções</DropdownMenuLabel>
						<DeleteDialog
							onConfirm={async (id) => {
								const res = await costAction.delete(id);

								if (!res?.success) {
									toast.error("Falha ao deletar gasto.", {
										description:
											"Tente novamente mais tarde",
									});
									throw new Error(res?.error);
								}

								toast.success("Gasto apagado com sucesso.");
							}}
							data={cost}
						>
							<DropdownMenuItem
								onSelect={(e) => e.preventDefault()}
							>
								<Trash2 />
								<span>Apagar</span>
							</DropdownMenuItem>
						</DeleteDialog>
						<UpdateDialog
							data={cost}
							onUpdate={async (formData) => {
								if (!formData.id)
									throw new Error(
										"Todos os campos devem ser preechidos.",
									);
								const res = await costAction.update(
									formData.id,
									formData,
								);

								if (!res?.success) {
									toast.error("Falha ao actualizar gasto.", {
										description:
											"Tente novamente mais tarde",
									});
									throw new Error(res?.error);
								}

								toast.success("Gasto actualizado com sucesso.");
							}}
						>
							<DropdownMenuItem
								onSelect={(e) => e.preventDefault()}
							>
								<Edit />
								<span>Alterar</span>
							</DropdownMenuItem>
						</UpdateDialog>
						<InfoDialog data={cost}>
							<DropdownMenuItem
								onSelect={(e) => e.preventDefault()}
							>
								<Info />
								<span>Mais detalhes</span>
							</DropdownMenuItem>
						</InfoDialog>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={async () => {
								const result = await copyToClipboard(cost.id);

								if (result.success) {
									toast.success(result.message);
								} else {
									toast.warning(result.message);
								}
							}}
						>
							<CopyCheck />
							<span>Copiar ID</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
