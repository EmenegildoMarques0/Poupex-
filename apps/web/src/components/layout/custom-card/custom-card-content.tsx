import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Info } from "lucide-react";
interface CustomCardContentProps {
	title: string;
	description: string;
	value: string;
}

export function CustomCardContent({
	title,
	description,
	value,
}: CustomCardContentProps) {
	return (
		<div>
			<div className="flex items-center gap-2">
				<span className="text-nowrap">{title}</span>
				<Tooltip>
					<TooltipTrigger asChild>
						<Info className="w-4 h-4" />
					</TooltipTrigger>
					<TooltipContent>
						<p>{description}</p>
					</TooltipContent>
				</Tooltip>
			</div>
			<span className="block text-2xl text-end font-semibold">
				{value}
			</span>
		</div>
	);
}