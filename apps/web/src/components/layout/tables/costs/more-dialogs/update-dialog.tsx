"use client";

import { Costs } from "@/@types/costs.type";
import { RegisterCostFormValues } from "@/@types/validations/register-cost.schema";
import { CostsForm } from "@/components/forms/costs-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";

interface UpdateDialogProps {
children: React.ReactNode;
  data: Costs;
  onUpdate?: (formData: Partial<RegisterCostFormValues & { id: number }>) => Promise<void> | void;
}

export function UpdateDialog({ children: trigger, data, onUpdate }: UpdateDialogProps) {
	const onSubmit = async (formData: Partial<RegisterCostFormValues>) => {
		const payload = { ...formData, id: data.id };

		if (onUpdate) {
			await onUpdate(payload);
		}
	};

  return (
		<Dialog>
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
