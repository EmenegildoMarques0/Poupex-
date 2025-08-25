"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { cn } from "@workspace/ui/lib/utils";

interface AvatarUserProps {
	size?: "default" | "smoll" | "medium" | "long";
	name: string;
	image?: string;
}

export const AvatarUser = ({ size = "default", name, image }: AvatarUserProps) => {
	return (
		<Avatar
			className={cn(
				"h-10 w-10 border-2 border-neutral-200 dark:border-neutral-700",
				size === "smoll"
					? "h-8 w-8"
					: size === "medium"
						? "h-14 w-14"
						: size === "long" && "h-24 w-24 md:h-32 md:w-32",
			)}
		>
			<AvatarImage src={image??"/"} alt={`@utilizador/${name}`} />
			<AvatarFallback
				className={cn(
					"bg-neutral-100 dark:bg-neutral-800",
					size === "medium"
						? "text-lg"
						: size === "long" && "text-5xl",
				)}
			>
				{name?.substring(0, 2).toUpperCase()}
			</AvatarFallback>
		</Avatar>
	);
};