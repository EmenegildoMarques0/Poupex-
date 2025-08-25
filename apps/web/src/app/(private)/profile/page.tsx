import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { ArrowLeft, Camera, Save, Trash2 } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
    return (
        <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="font-playfair text-3xl font-bold mb-2">Perfil do Usuário</h1>
                        <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências</p>
                    </div>
                </div>

                <div className="grid gap-6">
                    {/* Informações Pessoais */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações Pessoais</CardTitle>
                            <CardDescription>Atualize suas informações básicas de perfil</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Avatar */}
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="/user-profile-illustration.png" />
                                    <AvatarFallback className="text-lg">EM</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Button variant="outline" size="sm">
                                        <Camera className="mr-2 h-4 w-4" />
                                        Alterar Foto
                                    </Button>
                                    <p className="text-sm text-muted-foreground mt-1">JPG, PNG ou GIF. Máximo 2MB.</p>
                                </div>
                            </div>

                            {/* Campos do Formulário */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome Completo</Label>
                                    <Input id="name" defaultValue="Erivaldo Malebo" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="erivaldomalebo2206@gmail.com" disabled />
                                    <p className="text-xs text-muted-foreground">Email não pode ser alterado</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefone</Label>
                                    <Input id="phone" defaultValue="957031922" />
                                </div>
                            </div>

                            <Button className="stepcash-gradient">
                                <Save className="mr-2 h-4 w-4" />
                                Salvar Alterações
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Preferências */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Preferências</CardTitle>
                            <CardDescription>Configure suas preferências de notificação e privacidade</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Notificações por Email</Label>
                                    <p className="text-sm text-muted-foreground">Receber lembretes sobre seus desafios</p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Notificações Push</Label>
                                    <p className="text-sm text-muted-foreground">Receber notificações no navegador</p>
                                </div>
                                <Switch />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Relatórios Semanais</Label>
                                    <p className="text-sm text-muted-foreground">Receber resumo semanal do progresso</p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Modo Escuro Automático</Label>
                                    <p className="text-sm text-muted-foreground">Seguir configuração do sistema</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>


                    {/* Ações da Conta */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Ações da Conta</CardTitle>
                            <CardDescription>Gerencie sua conta e dados</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">Exportar Dados</h4>
                                    <p className="text-sm text-muted-foreground">Baixe uma cópia de todos os seus dados</p>
                                </div>
                                <Button variant="outline">Exportar</Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">Alterar Senha</h4>
                                    <p className="text-sm text-muted-foreground">Atualize sua senha de acesso</p>
                                </div>
                                <Button variant="outline">Alterar</Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-destructive">Desativar Conta</h4>
                                    <p className="text-sm text-muted-foreground">Desative temporariamente sua conta</p>
                                </div>
                                <Button variant="destructive" size="sm">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Desativar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}
