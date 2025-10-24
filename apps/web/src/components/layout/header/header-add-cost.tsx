"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CostsForm } from "@/components/forms/costs-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { RegisterCostFormValues } from "@/core/schemas/costs/register-costs.schema";

export function HeaderAddCost() {
	const [open, setOpen] = useState(false);
	const handleSubmit = async (formData: RegisterCostFormValues) => {
		console.log({ formData });

		setOpen(false);
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="text-white">
					<Plus />
					<span>Novo Gasto</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adicionar Gasto</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo e clique em{" "}
						<strong>Guardar</strong> para registrar o gasto.
					</DialogDescription>
				</DialogHeader>
				<CostsForm onSubmit={handleSubmit} />
			</DialogContent>
		</Dialog>
	);
}
