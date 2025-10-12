"use client";

import { CostsForm } from "@/components/forms/costs-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Costs } from "@/core/schemas/costs";
import { RegisterCostFormValues } from "@/core/schemas/costs/register-costs.schema";
import { useState } from "react";

interface UpdateDialogProps {
children: React.ReactNode;
  data: Costs;
  onUpdate?: (formData: Partial<RegisterCostFormValues & { id: number }>) => Promise<void> | void;
}

export function UpdateDialog({ children: trigger, data, onUpdate }: UpdateDialogProps) {
	const [open, setOpen] = useState(false);
	const onSubmit = async (formData: Partial<RegisterCostFormValues>) => {
		const payload = { ...formData, id: data.id };

		if (onUpdate) {
			await onUpdate(payload);
			setOpen(false)
		}
	};

  return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Atualizar gasto</DialogTitle>
					<DialogDescription>
						Edite as informações do gasto e clique em <b>Guardar</b> para salvar as alterações.
					</DialogDescription>
				</DialogHeader>

				<CostsForm 
					defaultValues={{
						category: data.category,
						data: data.data,
						value: data.value,
						description: data.description,
					}}
					onSubmit={onSubmit}
				/>
			</DialogContent>
		</Dialog>
  );
}
