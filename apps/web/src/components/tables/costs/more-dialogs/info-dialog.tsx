"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Costs } from "@/core/schemas/costs";

interface InfoDialogProps {
  children: React.ReactNode;
  data: Costs;
}

export function InfoDialog({ children: trigger, data }: InfoDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalhes do gasto</DialogTitle>
                    <DialogDescription>
                        Veja abaixo as informações registradas para este gasto.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-3 text-sm">
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-neutral-700">ID</span>
                        <span>{data.id}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-neutral-700">Categoria</span>
                        <span>{data.category}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-neutral-700">Data</span>
                        <span>{new Date(data.created_at).toLocaleDateString("pt-PT")}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-neutral-700">Valor</span>
                        <span>{Number(data.value).toLocaleString("pt-PT", { style: "currency", currency: "AOA" })}</span>
                    </div>
                    {data.description && (
                        <div className="flex flex-col gap-1">
                        <span className="font-medium text-neutral-700">Descrição</span>
                        <span className="text-neutral-600">{data.description}</span>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
