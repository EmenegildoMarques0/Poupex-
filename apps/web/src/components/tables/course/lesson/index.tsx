"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { parseAsInteger, useQueryState } from "nuqs";
import { columns } from "./columns";
import { useState } from "react";
import { useSearchColumnFilter } from "@/core/hooks/search-column-filter";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SearchX } from "lucide-react";
import { Lesson } from "@/core/schemas/course/lesson.schema";

interface TableListLessonCourseProps {
    data: Lesson[];
}

export function TableListLessonCourse({ data }: TableListLessonCourseProps) {
    const [pageQuery, setPageQuery] = useQueryState(
        "page",
        parseAsInteger.withDefault(1),
    );


    const pageIndex = pageQuery - 1;
    const setPageIndex = (index: number) => setPageQuery(index + 1);
    const pageSize = 10;

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);


    const table = useReactTable({
        data,
        columns,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: (updater) => {
            const nextPageIndex =
                typeof updater === "function"
                    ? updater({ pageIndex, pageSize }).pageIndex
                    : updater.pageIndex;
            setPageIndex(Math.max(0, nextPageIndex));
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
            pagination: { pageIndex, pageSize },
        },
    });

    const { search, setSearch } = useSearchColumnFilter(table, "title");

    return (
        <div className="w-full">
            <div className="flex items-center justify-between gap-4 py-4">
                <span>
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} aulas exibidas

                </span>
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Pesquisar curso ..."
                        value={search}
                        onChange={({ target }) => setSearch(target.value)}
                        className="max-w-sm"
                    />
                </div>
            </div>

            <div className="rounded-md border max-md:hidden overflow-hidden">
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
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <SearchX size={32} />
                                        <span>Nenhuma venda encontrado</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
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
    )
}