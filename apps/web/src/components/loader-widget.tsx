import { Loader2 } from "lucide-react";

interface LoaderWidgetProps {
    label?: string;
}

export function LoaderWidget({ label = "Carregando" }: LoaderWidgetProps) {
    return (
        <div className="flex items-center">
            <Loader2 className="mr-2 animate-spin" />
            <span>{label}{"..."}</span>
        </div>
    )
}