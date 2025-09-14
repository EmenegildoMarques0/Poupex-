"use client"
import { RegisterCostFormValues } from "@/@types/validations/register-cost.schema";
import { createCostAction } from "@/actions/costs/create-costs";
import { CostsForm } from "@/components/forms/costs-form";
import { Button } from "@workspace/ui/components/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog";
import { PlusCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function RegisterCostDialog() {
    const [open, setOpen] = useState(false)

    const handleCreateCost = useCallback(async (values: RegisterCostFormValues) => {
        try {
            const res = await createCostAction(values);
            toast.success("Custo criado com sucesso", {
                description: `${res.data.description}`,
            });
            setOpen(false);
        } catch (err) {
            toast.error("Erro ao criar custo");
        }
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button">
                    <PlusCircle className="h-4 w-4" />
                    <span className="max-md:sr-only">Adicionar gasto</span>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cadastrar novo gasto</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para registrar um novo gasto no
                        sistema.
                    </DialogDescription>
                </DialogHeader>

                <CostsForm onSubmit={handleCreateCost} />
            </DialogContent>
        </Dialog>
    )
}