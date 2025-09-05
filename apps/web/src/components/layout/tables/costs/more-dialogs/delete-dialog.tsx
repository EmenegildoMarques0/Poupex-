"use client";

import { Costs } from "@/@types/costs.type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useState } from "react";

interface DeleteDialogProps {
  children: React.ReactNode;
  data: Costs;
  onConfirm: (id: string | number) => Promise<void> | void;
}

export function DeleteDialog({ children: trigger, data, onConfirm }: DeleteDialogProps) {
    const [confirmation, setConfirmation] = useState("");

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const expectedText = `delete gasto #${data.id}`;
    const isValid = confirmation.trim().toLowerCase() === expectedText.toLowerCase();


    const handleDeleteCostConfirm = async () => {
        try {
            setLoading(true);
            setError(null);
            
            await onConfirm(data.id);

            setOpen(false);
            setConfirmation("");
        } catch (err) {
            console.error(err);
            setError("Ocorreu um erro ao excluir. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Apagar gasto</DialogTitle>
                        <DialogDescription>
                            Esta ação não pode ser desfeita. O gasto será permanentemente removido do sistema.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3">
                        <p className="text-sm text-neutral-600">
                            Tem certeza que deseja eliminar este gasto?  
                            Para confirmar, digite exatamente:  
                            <span className="font-semibold text-red-600">{expectedText}</span>
                        </p>

                        <Input
                            value={confirmation}
                            onChange={(e) => setConfirmation(e.target.value)}
                            placeholder={`Digite: ${expectedText}`}
                        />
                    </div>

                    <DialogFooter className="mt-4 gap-3 justify-end">
                        <Button type="button" variant="ghost">
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            disabled={!isValid}
                            onClick={handleDeleteCostConfirm}
                        >
                           {loading ? "Apagando..." : "Apagar gasto"}
                        </Button>
                    </DialogFooter>

                    {error && (
                        <p className="text-sm text-red-600 mt-2">{error}</p>
                    )}
                </DialogContent>
        </Dialog>
    );
}
