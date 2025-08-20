"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarTriggerProps {
	size?: "default" | "smoll" | "medium" | "long";
}

export const AvatarTrigger = ({ size = "default" }: AvatarTriggerProps) => {
	const { user: session } = {
        user: {
            name: "Erivaldo Malebo"
        }
    };
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
			<AvatarImage src="/" alt="@utilizador" />
			<AvatarFallback
				className={cn(
					"bg-neutral-100 dark:bg-neutral-800",
					size === "medium"
						? "text-lg"
						: size === "long" && "text-5xl",
				)}
			>
				{session?.name?.substring(0, 2).toUpperCase()}
			</AvatarFallback>
		</Avatar>
	);
};