"use client";

import type { Table } from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";

export function useSearchColumnFilter<T>(
	table: Table<T> | undefined,
	columnId: string,
	queryKey = "search",
) {
	const [search, setSearch] = useQueryState(queryKey, {
		defaultValue: "",
		clearOnDefault: true,
	});

	const [debouncedSearch] = useDebounce(search, 300);

	useEffect(() => {
		const column = table?.getColumn?.(columnId);
		if (column) column.setFilterValue(debouncedSearch);
	}, [debouncedSearch, table, columnId]);

	return { search, setSearch };
}