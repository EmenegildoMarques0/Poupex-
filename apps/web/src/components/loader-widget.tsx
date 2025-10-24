import { Spinner } from "@/components/ui/spinner";

interface LoaderWidgetProps {
	label?: string;
}

export function LoaderWidget({ label = "Carregando" }: LoaderWidgetProps) {
	return (
		<div className="flex items-center">
			<Spinner />
			<span>
				{label}
				{"..."}
			</span>
		</div>
	);
}
