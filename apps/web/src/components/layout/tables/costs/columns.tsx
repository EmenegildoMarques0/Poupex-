"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { Button } from "@workspace/ui/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { copyToClipboard } from "@/lib/formats/copy-to-clipboard";
import { formatDate } from "@/lib/formats/format-date";
import { CopyCheck, Edit, Info, MoreVertical, Trash2 } from "lucide-react";
import { Costs } from "@/@types/costs.type";
import { formatCurrency } from "@/lib/formats/format-currency";
import { DeleteDialog } from "./more-dialogs/delete-dialog";
import { UpdateDialog } from "./more-dialogs/update-dialog";
import { InfoDialog } from "./more-dialogs/info-dialog";

export const columns: ColumnDef<Costs>[] = [
    {
		accessorKey: "id",
		header: () => <div className="text-start">Índice</div>,
		cell: ({ row }) => {
			return (
				<div className="text-start">
					{row.original.id}
				</div>
			);
		},
	},
	{
		accessorKey: "category",
		header: "Categoria",
		cell: ({ row }) => {
			const field = row.getValue("category") as string;
			return (
				<div>
					{field}
				</div>
			);
		},
	},
	{
		accessorKey: "description",
		header: "Descrição",
		cell: ({ row }) => {
			return (
				<div>
						{row.original.description}
				</div>
			);
		},
	},
	{
		accessorKey: "value",
		header: "Valor (Kz)",
		cell: ({ row }) => {
			return (
				<div>
					{formatCurrency(row.original.value)}
				</div>
			);
		},
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
							<DeleteDialog onConfirm={() => {}} data={cost}>
						<DropdownMenuItem  onSelect={(e) => e.preventDefault()}>
                                <Trash2 />
							<span>Apagar</span>
						</DropdownMenuItem>
                            </DeleteDialog>
							<UpdateDialog data={cost}>
						<DropdownMenuItem  onSelect={(e) => e.preventDefault()}>
                                <Edit />
							<span>Alterar</span>
						</DropdownMenuItem>
                            </UpdateDialog>
							<InfoDialog data={cost}>
						<DropdownMenuItem  onSelect={(e) => e.preventDefault()}>
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