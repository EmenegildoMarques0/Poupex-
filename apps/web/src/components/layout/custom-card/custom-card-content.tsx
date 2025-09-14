import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Info } from "lucide-react";
import { memo } from "react";

interface CustomCardContentProps {
	title: string;
	description: string;
	value: string | number;
}

export const CustomCardContent = memo(function CustomCardContent({
	title,
	description,
	value,
}: CustomCardContentProps) {
	return (
		<div className="flex flex-col gap-1 overflow-hidden">
			<div className="flex items-center gap-2">
				<span className="whitespace-nowrap">{title}</span>
				{description && (
					<Tooltip>
						<TooltipTrigger asChild>
							<Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-sm">{description}</p>
						</TooltipContent>
					</Tooltip>
				)}
			</div>

			<span className="
				block text-2xl text-end font-semibold 
				overflow-hidden text-ellipsis 
				truncate
				max-w-[11rem] sm:max-w-[12rem] md:max-w-[16rem] lg:max-w-[20rem]
			"
				title={String(value)}
			>
				{value}
			</span>
		</div>
	);
});
