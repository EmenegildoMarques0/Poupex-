"use client";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";

export function SearchCorseInput() {
	const [searchParams, setSearchParams] = useQueryState("search", {
		defaultValue: "",
	});
	return (
		<div className="relative">
			<Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2" />
			<Input
				type="text"
				className="pl-10"
				placeholder="Buscar cursos..."
				value={searchParams}
				onChange={({ target }) => setSearchParams(target.value)}
			/>
		</div>
	);
}
