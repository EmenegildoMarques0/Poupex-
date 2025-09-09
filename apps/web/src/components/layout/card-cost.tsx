"use client";

import { Edit, Trash2 } from "lucide-react";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Costs } from "@/@types/costs.type";


type Props = {
    cost: Costs;
    onEdit?: (cost: Costs) => void;
    onDelete?: (id: number | string) => void;
    currency?: string; // default: USD
    locale?: string; // default: pt-AO
};

export function CostCard({
    cost,
    onEdit,
    onDelete,
    currency = "AOA",
    locale = "pt-PT",
}: Props) {
    const formatDate = (d: string) => {
        try {
            const date = new Date(d);
            return new Intl.DateTimeFormat(locale, {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }).format(date);
        } catch {
            return d;
        }
    };

    const formatCurrency = (v: number) =>
        new Intl.NumberFormat(locale, { style: "currency", currency }).format(v);

    return (
        <Card className="w-full rounded-2xl border shadow-lg p-4 bg-background md:hidden transition-transform active:scale-[0.98] ">
            <CardHeader className="p-0 mb-4">
                <div className="flex flex-col gap-1">
                    <Badge className="self-start text-[11px] uppercase tracking-wide px-2 py-0.5 bg-primary/10 text-primary">
                        {cost.category}
                    </Badge>
                    <CardTitle title={cost.description} className="text-xl font-semibold leading-tight break-words line-clamp-2">
                        {cost.description || "Sem descrição"}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{formatDate(cost.data)}</p>
                </div>
            </CardHeader>

      
            <CardContent className="p-0 flex-1 flex items-end">
                <div className="flex flex-col gap-3">
                    <div>
                        <span className="block text-xs text-muted-foreground">Valor</span>
                        <span className="text-2xl font-bold text-primary truncate max-w-20">
                            {formatCurrency(cost.value)}
                        </span>
                    </div>
                </div>
            </CardContent>

      
            <CardFooter className="mt-4 p-0 grid grid-cols-2 gap-3">
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => onEdit && onEdit(cost)}
                >
                    <Edit className="h-4 w-4" />
                    Editar
                </Button>
                <Button
                    variant="destructive"
                    size="lg"
                    className="w-full"
                    onClick={() => onDelete && onDelete(cost.id)}
                >
                    <Trash2 className="h-4 w-4" />
                    Excluir
                </Button>
            </CardFooter>
        </Card>
    );
}
