import { Card, CardContent } from "@/components/ui/card";
import type React from "react";

interface CustomCardRootProps {
	children: React.ReactNode;
}

export function CustomCardRoot({ children }: CustomCardRootProps) {
	return (
		<Card className="p-4">
			<CardContent className="flex gap-4 justify-between p-0">
				{children}
			</CardContent>
		</Card>
	);
}