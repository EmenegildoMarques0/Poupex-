"use client";

import { Costs, CostsFormValues } from "@/@types/costs.type";
import { CostsForm } from "@/components/layout/header/costs-form";
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
  onUpdate?: (formData: Partial<CostsFormValues & { id: string }>) => Promise<void> | void;
}

export function UpdateDialog({ children: trigger, data, onUpdate }: UpdateDialogProps) {
  const onSubmit = async (formData: Partial<CostsFormValues>) => {
    const payload = { ...formData, id: data.id };
    console.log("Atualizar gasto:", payload);

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
            date: data.created_at,
            value: data.value,
            description: data.description,
          }}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
