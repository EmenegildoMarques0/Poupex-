"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Trash2 } from "lucide-react"

export function AccountActionsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ações da Conta</CardTitle>
                <CardDescription>Gerencie sua conta e dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ActionRow title="Exportar Dados" desc="Baixe uma cópia de todos os seus dados" buttonLabel="Exportar" disabled />
                <ActionRow title="Alterar Senha" desc="Atualize sua senha de acesso" buttonLabel="Alterar" disabled />
                <ActionRow 
                    title="Desativar Conta" 
                    desc="Desative temporariamente sua conta" 
                    buttonLabel="Desativar" 
                    destructive 
                />
            </CardContent>
        </Card>
    )
}

interface ActionRowProps {
    title: string;
    desc: string;
    buttonLabel: string;
    destructive?: boolean;
    disabled?: boolean;
}

export function ActionRow({
    title,
    desc,
    buttonLabel,
    destructive = false,
    disabled = false
}: ActionRowProps) {
    return (
        <div
            className={`flex items-center justify-between p-4 border rounded-lg transition 
                ${destructive ? "border-destructive/20" : ""}
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            <div>
                <h4 className={`font-medium ${destructive ? "text-destructive" : ""}`}>
                    {title}
                </h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
            <Button
                variant={destructive ? "destructive" : "outline"}
                size="sm"
                disabled={disabled}
            >
                {destructive && <Trash2 className="mr-2 h-4 w-4" />}
                {buttonLabel}
            </Button>
        </div>
  )
}

