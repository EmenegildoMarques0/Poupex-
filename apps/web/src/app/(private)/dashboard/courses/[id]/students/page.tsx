import { Card, CardContent } from "@workspace/ui/components/card"
import { Users } from "lucide-react"

export default function CourseStudentsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Alunos do Curso</h2>
                <p className="text-muted-foreground">Gerencie os alunos matriculados neste curso</p>
            </div>

            <Card>
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
                    <h3 className="font-semibold text-xl mb-2">Gerenciamento de alunos em breve</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                        Em breve você poderá visualizar e gerenciar os alunos matriculados, acompanhar progresso e enviar
                        notificações
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
