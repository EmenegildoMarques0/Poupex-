"use client";

import {
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, SearchX } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import * as React from "react";

import { Button } from "@workspace/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Input } from "@workspace/ui/components/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@workspace/ui/components/table";
import { columns } from "./columns";
import { useSearchColumnFilter } from "@/hooks/search-column-filter";
import { Costs } from "@/@types/costs.type";
import { CostCard } from "../../card-cost";

interface TableListCostsProps {
	data: Costs[]
}

export function TableListCosts({ data }: TableListCostsProps) {
	const [pageQuery, setPageQuery] = useQueryState(
		"page",
		parseAsInteger.withDefault(1),
	);

	const pageIndex = pageQuery - 1;
	const setPageIndex = (index: number) => setPageQuery(index + 1);

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const pageSize = 10;

	const table = useReactTable({
		data,
		columns,
		pageCount: Math.ceil(data.length / pageSize),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onPaginationChange: (updater) => {
			const nextPageIndex =
				typeof updater === "function"
					? updater({ pageIndex, pageSize }).pageIndex
					: updater.pageIndex;
			setPageIndex(Math.max(0, nextPageIndex));
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			pagination: { pageIndex, pageSize },
		},
	});

	const { search, setSearch } = useSearchColumnFilter(table, "category");

	return (
		<div className="w-full">
			<div className="flex items-center justify-between gap-4 py-4">
				<h1 className="text-lg md:text-xl font-semibold text-nowrap">Lista de Gastos</h1>
				<div className="flex items-center gap-4">
					<Input
						placeholder="Filtrar aqui..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="max-w-sm"
					/>

					<DropdownMenu>
						<DropdownMenuTrigger asChild className="max-md:hidden" >
							<Button variant="outline" className="ml-auto">
								Colunas <ChevronDown className="ml-1 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((col) => col.getCanHide())
								.map((column) => (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(v) =>
											column.toggleVisibility(!!v)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="rounded-md border max-md:hidden">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((group) => (
							<TableRow
								key={group.id}
								className="hover:bg-transparent"
							>
								{group.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map(
								(row) => (
										<TableRow
											key={row.id}
											data-state={
												row.getIsSelected() &&
												"selected"
											}
										>
											{row
												.getVisibleCells()
												.map((cell) => (
													<TableCell key={cell.id}>
														{flexRender(
															cell.column
																.columnDef.cell,
															cell.getContext(),
														)}
													</TableCell>
												))}
										</TableRow>
									),
							)
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									<div className="flex flex-col items-center gap-2 text-muted-foreground">
										<SearchX size={32} />
										<span>Nenhum gasto encontrado</span>
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="grid min-sm:grid-cols-2 gap-4 items-stretch md:hidden">
				{table.getRowModel().rows.length ? (
					table.getRowModel().rows.map(row =>(
						<CostCard key={row.id} cost={row.original} />
					))
				) : (
					<div className="flex flex-col min-sm:col-span-2 min-h-80 justify-center select-none items-center gap-2 text-muted-foreground">
						<SearchX size={32} />
						<span className="text-center">Nenhum gasto encontrado</span>
					</div>
				)}
			</div>

			<div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
				{/* <span>
					{table.getFilteredSelectedRowModel().rows.length} de{" "}
					{table.getFilteredRowModel().rows.length} linha(s)
					selecionada(s).
				</span> */}
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Anterior
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Próximo
					</Button>
				</div>
			</div>
		</div>
	);
}