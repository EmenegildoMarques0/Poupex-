"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ThemeSelect } from "@/components/theme-select"
import { requestPushPermission } from "@/lib/notification-push-permission"

export function PreferencesCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Preferências</CardTitle>
                <CardDescription>Configure suas preferências de notificação e privacidade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <PreferenceItem label="Notificações por Email" desc="Receber lembretes sobre seus desafios" defaultChecked />
                <PreferenceItem 
                    label="Notificações Push" 
                    desc="Receber notificações no navegador" 
                    onChange={async (checked) => {
                        if (checked) {
                        const perm = await requestPushPermission()
                            console.log(perm === "granted")
                        } else {
                            console.log(false)
                        }
                    }}
                />
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Modo Escuro Automático</Label>
                        <p className="text-sm text-muted-foreground">Seguir configuração do sistema</p>
                    </div>
                    <ThemeSelect />
                </div>
            </CardContent>
        </Card>
    )
}

function PreferenceItem({
    label,
    desc,
    defaultChecked,
    onChange
}: {
    label: string
    desc: string
    defaultChecked?: boolean
    onChange?: (checked: boolean) => void
}) {
    return (
        <div className="flex items-center justify-between">
            <div className="space-y-0.5">
                <Label>{label}</Label>
                <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
            <Switch defaultChecked={defaultChecked} onCheckedChange={onChange} />
        </div>
    )
}
