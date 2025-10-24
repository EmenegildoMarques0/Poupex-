import { cn } from "@//lib/utils";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type InfoCardProps = {
	title: string;
	value: string;
	subtitle?: string;
	badge?: string;
	className?: React.ComponentProps<"div">["className"];
};

export function InfoCard({
	title,
	value,
	subtitle,
	badge,
	className,
}: InfoCardProps) {
	return (
		<Card
			className={cn(
				"min-h-24 flex flex-col justify-between rounded-xl bg-muted/80",
				className,
			)}
		>
			<CardHeader
				className={cn(
					"flex items-center w-full pb-0 flex-wrap",
					badge ? "justify-between" : "justify-center",
				)}
			>
				<CardTitle className="text-base font-medium">{title}</CardTitle>
				{badge && (
					<Badge className="text-xs px-2 py-0.5">{badge}</Badge>
				)}
			</CardHeader>

			<CardContent className="flex flex-col items-center justify-center gap-1">
				<span
					title={value}
					className="text-xl font-bold truncate max-w-[12rem] md:max-w-[7rem] lg:max-w-[12rem]  text-center"
				>
					{value}
				</span>
			</CardContent>

			{subtitle && (
				<CardFooter className="flex items-center justify-center pt-0">
					<span className="text-xs text-muted-foreground">
						{subtitle}
					</span>
				</CardFooter>
			)}
		</Card>
	);
}
